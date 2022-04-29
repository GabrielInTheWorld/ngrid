import { Fragment } from './fragment';
import { Fragments } from './fragments';
import { findIntersectionType, IntersectionType } from './utils';
/**
 * A Caching strategy that enforces storing cache rows in blocks where
 *
 *  - All blocks have the same predefined size (configurable)
 *  - A block contains items in a sequence (I.E A block is a page)
 *
 * In Addition, the cache is limited by size (configurable).
 * When items are added or when maximum size is updated the cache will auto-purge items
 * that cause overflow.
 *
 * Beside overflow, not other logic can perform automatic purging.
 *
 * This is best for grid's that use a datasource with an index based pagination (skip/limit) and
 */
export class FragmentedBlockCache {
    constructor(context, options) {
        this.context = context;
        this._maxSize = 0;
        // DO NOT MODIFY FRAGMENT ITEMS IN THE COLLECTION WITHOUT CALLING "markDirty()" afterwards
        this.fragments = new Fragments();
        this.lastStartRow = 0;
        this.lastDir = 1;
        this.options = Object.assign({}, (options || {}));
    }
    get maxSize() { return this._maxSize; }
    get size() { return this.fragments.size; }
    get empty() { return this.size === 0; }
    remove(startRow, count) {
        return this.fragments.remove(startRow, count);
    }
    /**
     * Set the new max size for this cache.
     * @returns When new max size is bigger the old & current size violates the new max size, return the number of items trimmed from the cache
     * with positive value if trimmed from end, negative value if trimmed from start. Otherwise returns 0.
     */
    setCacheSize(maxSize) {
        this._maxSize = Math.max(0, maxSize);
        return this.alignBoundary();
    }
    update(startRow, endRow, direction) {
        this.coldLocation = direction === 1 ? -1 : 1;
        return this.add(startRow, endRow);
    }
    clear() {
        this.coldLocation = undefined;
        if (this.empty) {
            return [[0, 0]];
        }
        return this.fragments.clear();
    }
    createBlock(startIndex, endIndex, totalLength = 0) {
        const [direction, start, end] = this.matchBlock(startIndex, endIndex) || [];
        // LOG(`CREATE BLOCK: [${startIndex}, ${endIndex}] => [${direction}, ${start}, ${end}]`)
        if (!direction) {
            return undefined;
        }
        const { blockSize } = this.context.options;
        const { strictPaging } = this.options;
        let fromRow;
        let toRow;
        switch (direction) {
            case -1:
                fromRow = Math.max(0, end - (blockSize - 1));
                toRow = end;
                if (!strictPaging && fromRow < start) {
                    fromRow = Math.min(this.fragments.findClosestMissing(fromRow, 1), start);
                }
                break;
            case 1:
                fromRow = start;
                toRow = start + blockSize - 1;
                if (!strictPaging && toRow > end) {
                    toRow = Math.max(this.fragments.findClosestMissing(toRow, -1), end);
                }
                break;
        }
        if (totalLength && fromRow >= totalLength) {
            return undefined;
        }
        // Strict Block logic:
        // Now, we align the block to match a sequential world of blocks based on the block size.
        // If we have a gap we want to divert to the nearest block start/end, based on the direction.
        // If we go down (direction is 1) we want the nearest block start BELOW us, getting duplicates in the call but ensuring no gaps ahead
        // If we go up (direction is -1) we want to nearest block start ABOVE us, getting duplicates in the call but ensuring no gaps ahead.
        if (strictPaging) {
            const main = direction === 1 ? fromRow : toRow;
            let rem = main % blockSize;
            if (rem !== 0) {
                fromRow = main - rem;
                toRow = fromRow + blockSize - 1;
            }
        }
        if (totalLength && toRow >= totalLength) {
            toRow = totalLength - 1;
            if (strictPaging) {
                fromRow = toRow - (toRow % blockSize);
            }
        }
        return [direction, fromRow, toRow];
    }
    matchBlock(start, end) {
        if (this.empty) {
            return [1, start, end];
        }
        const iFirst = this.fragments.searchRowProximity(start);
        const iLast = this.fragments.searchRowProximity(end);
        if (iFirst === -1) {
            return [1, start, end];
        }
        const first = this.fragments[iFirst];
        if (iLast === -1) {
            return [1, first.containsRow(start) ? first.end + 1 : start, end];
        }
        const intersectionType = findIntersectionType(first, new Fragment(start, end));
        const dir = this.lastStartRow > start ? -1 : this.lastStartRow === start ? this.lastDir : 1;
        this.lastStartRow = start;
        this.lastDir = dir;
        // The logic here assumes that there are not sequential blocks, (e.g. block 1 [0, 99], block 2 [100, 199])
        // All sequential blocks are to be merged via checkAndMerge on the fragments collection
        switch (intersectionType) {
            case IntersectionType.none:
                return [dir, start, end];
            case IntersectionType.partial:
                if (iFirst === iLast) {
                    if (start < first.start) {
                        return [dir, start, first.start - 1];
                    }
                    else {
                        return [dir, first.end + 1, end];
                    }
                }
                else {
                    const last = this.fragments[iLast];
                    return [dir, start < first.start ? start : first.end + 1, end >= last.start ? last.start - 1 : end];
                }
            case IntersectionType.contained:
                const last = this.fragments[iLast];
                return [dir, start, end >= last.start ? last.start - 1 : end];
            case IntersectionType.contains:
            case IntersectionType.full:
                return undefined;
        }
    }
    add(startRow, endRow) {
        if (startRow < 0 || endRow <= 0) {
            return [];
        }
        const newFragment = new Fragment(startRow, endRow);
        const iFirst = this.fragments.searchRowProximity(startRow);
        const first = this.fragments[iFirst];
        const intersectionType = !first ? null : findIntersectionType(first, newFragment);
        switch (intersectionType) {
            case null:
                // EDGE CASE: when  "first" is undefined, i.e. "iFirst" is -1
                // This edge case means no proximity, i,e. the new fragment is AFTER the last fragment we currently have (or we have no fragments)
                this.fragments.push(newFragment);
                break;
            case IntersectionType.none: // it means first === last
                this.fragments.splice(iFirst, 0, newFragment);
                break;
            case IntersectionType.partial:
            case IntersectionType.contained:
                let iLast = this.fragments.searchRowProximity(endRow);
                if (iLast === -1) {
                    iLast = this.fragments.length - 1;
                }
                const last = this.fragments[iLast];
                first.start = Math.min(newFragment.start, first.start);
                if (newFragment.end >= last.start) {
                    first.end = newFragment.end;
                    this.fragments.splice(iFirst + 1, iLast - iFirst);
                }
                else {
                    first.end = Math.max(newFragment.end, first.end);
                    this.fragments.splice(iFirst + 1, (iLast - 1) - iFirst);
                }
                break;
            case IntersectionType.contains:
            case IntersectionType.full:
                return [];
        }
        this.fragments.markDirty();
        this.fragments.checkAndMerge();
        return this.alignBoundary();
    }
    oversize() {
        return this._maxSize ? Math.max(this.size - this._maxSize, 0) : 0;
    }
    alignBoundary() {
        const oversize = this.oversize();
        return oversize > 0 ? this.fragments.removeItems(oversize, this.coldLocation || 1) : [];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhZ21lbnRlZC1ibG9jay1jYWNoZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmdyaWQvaW5maW5pdGUtc2Nyb2xsL3NyYy9saWIvaW5maW5pdGUtc2Nyb2xsLWRhdGEtc291cmNlL2NhY2hpbmcvZnJhZ21lbnRlZC1ibG9jay1jYWNoZS9mcmFnbWVudGVkLWJsb2NrLWNhY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDdEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN4QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFlakU7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQU0sT0FBTyxvQkFBb0I7SUFlL0IsWUFBNkIsT0FBd0MsRUFBRSxPQUFxQztRQUEvRSxZQUFPLEdBQVAsT0FBTyxDQUFpQztRQVA3RCxhQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRXJCLDBGQUEwRjtRQUNsRixjQUFTLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUM1QixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQixZQUFPLEdBQWUsQ0FBQyxDQUFDO1FBRzlCLElBQUksQ0FBQyxPQUFPLHFCQUFRLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFFLENBQUM7SUFDeEMsQ0FBQztJQWZELElBQUksT0FBTyxLQUFhLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDL0MsSUFBSSxJQUFJLEtBQWEsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDbEQsSUFBSSxLQUFLLEtBQUssT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFldkMsTUFBTSxDQUFDLFFBQWdCLEVBQUUs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LENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztpQkFDekQ7Z0JBQ0QsTUFBTTtZQUNSLEtBQUssZ0JBQWdCLENBQUMsUUFBUSxDQUFDO1lBQy9CLEtBQUssZ0JBQWdCLENBQUMsSUFBSTtnQkFDeEIsT0FBTyxFQUFFLENBQUM7U0FDYjtRQUVELElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMvQixPQUFPLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRU8sUUFBUTtRQUNkLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRU8sYUFBYTtRQUNuQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDakMsT0FBTyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzFGLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibEluZmluaXRlU2Nyb2xsRFNDb250ZXh0IH0gZnJvbSAnLi4vLi4vaW5maW5pdGUtc2Nyb2xsLWRhdGFzb3VyY2UuY29udGV4dCc7XG5pbXBvcnQgeyBDYWNoZUFkYXB0ZXJPcHRpb25zLCBDYWNoZUJsb2NrLCBQYmxOZ3JpZENhY2hlQWRhcHRlciwgUm93U2VxdWVuY2UsIFN0YXJ0T3JFbmQgfSBmcm9tICcuLi9jYWNoZS1hZGFwdGVyJztcbmltcG9ydCB7IEZyYWdtZW50IH0gZnJvbSAnLi9mcmFnbWVudCc7XG5pbXBvcnQgeyBGcmFnbWVudHMgfSBmcm9tICcuL2ZyYWdtZW50cyc7XG5pbXBvcnQgeyBmaW5kSW50ZXJzZWN0aW9uVHlwZSwgSW50ZXJzZWN0aW9uVHlwZSB9IGZyb20gJy4vdXRpbHMnO1xuXG4vLyBjb25zdCBMT0cgPSBtc2cgPT4geyBjb25zb2xlLmxvZyhtc2cpOyB9XG5cbmV4cG9ydCBpbnRlcmZhY2UgRnJhZ21lbnRlZEJsb2NrQ2FjaGVPcHRpb25zIGV4dGVuZHMgQ2FjaGVBZGFwdGVyT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBXaGVuIHNldCB0byB0cnVlIHRoZSBjYWNoZSB3aWxsIGZvcmNlIHRoZSBibG9ja3MgdG8gYWxpZ24gcGVyZmVjdGx5LCB3aGVyZSBubyBldmVudCBjYW4gYmUgZmlyZWQgd2l0aCByb3dzXG4gICAqIHRoYXQgb3ZlcmxhcCBhbnkgb3RoZXIgcGVydmlvdXMgb3IgZnV0dXJlIGV2ZW50IHVubGVzcyB0aGV5IG92ZXJsYXAgZnVsbHkuXG4gICAqIEZvciBleGFtcGxlLCBpZiB0aGUgYmxvY2sgc2l6ZSBpcyA1MCBhbmQgXCJzdHJpY3RQYWdpbmdcIiBpcyB0cnVlIHRoZSBldmVudHMgd2lsbCBpbmNsdWRlIGZyb21Sb3csIHRvUm93czogWzAsIDQ5XSBbNTAsIDk5XSAuLi4uIFszMDAsIDM0OV1cbiAgICogSWYgJ3N0cmljdFBhZ2luZyBpcyBmYWxzZSB5b3UgbWlnaHQgZ2V0IHRoZSBhYm92ZSBidXQgbWlnaHQgYWxzbyBnZXQgWzczLCAxMjJdIGV0Yy4uLlxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgc3RyaWN0UGFnaW5nPzogYm9vbGVhblxufVxuXG4vKipcbiAqIEEgQ2FjaGluZyBzdHJhdGVneSB0aGF0IGVuZm9yY2VzIHN0b3JpbmcgY2FjaGUgcm93cyBpbiBibG9ja3Mgd2hlcmVcbiAqXG4gKiAgLSBBbGwgYmxvY2tzIGhhdmUgdGhlIHNhbWUgcHJlZGVmaW5lZCBzaXplIChjb25maWd1cmFibGUpXG4gKiAgLSBBIGJsb2NrIGNvbnRhaW5zIGl0ZW1zIGluIGEgc2VxdWVuY2UgKEkuRSBBIGJsb2NrIGlzIGEgcGFnZSlcbiAqXG4gKiBJbiBBZGRpdGlvbiwgdGhlIGNhY2hlIGlzIGxpbWl0ZWQgYnkgc2l6ZSAoY29uZmlndXJhYmxlKS5cbiAqIFdoZW4gaXRlbXMgYXJlIGFkZGVkIG9yIHdoZW4gbWF4aW11bSBzaXplIGlzIHVwZGF0ZWQgdGhlIGNhY2hlIHdpbGwgYXV0by1wdXJnZSBpdGVtc1xuICogdGhhdCBjYXVzZSBvdmVyZmxvdy5cbiAqXG4gKiBCZXNpZGUgb3ZlcmZsb3csIG5vdCBvdGhlciBsb2dpYyBjYW4gcGVyZm9ybSBhdXRvbWF0aWMgcHVyZ2luZy5cbiAqXG4gKiBUaGlzIGlzIGJlc3QgZm9yIGdyaWQncyB0aGF0IHVzZSBhIGRhdGFzb3VyY2Ugd2l0aCBhbiBpbmRleCBiYXNlZCBwYWdpbmF0aW9uIChza2lwL2xpbWl0KSBhbmRcbiAqL1xuZXhwb3J0IGNsYXNzIEZyYWdtZW50ZWRCbG9ja0NhY2hlIGltcGxlbWVudHMgUGJsTmdyaWRDYWNoZUFkYXB0ZXI8RnJhZ21lbnRlZEJsb2NrQ2FjaGVPcHRpb25zPiB7XG5cbiAgZ2V0IG1heFNpemUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX21heFNpemU7IH1cbiAgZ2V0IHNpemUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuZnJhZ21lbnRzLnNpemU7IH1cbiAgZ2V0IGVtcHR5KCkgeyByZXR1cm4gdGhpcy5zaXplID09PSAwOyB9XG5cbiAgcmVhZG9ubHkgb3B0aW9uczogRnJhZ21lbnRlZEJsb2NrQ2FjaGVPcHRpb25zO1xuXG4gIHByaXZhdGUgX21heFNpemUgPSAwO1xuICBwcml2YXRlIGNvbGRMb2NhdGlvbjogU3RhcnRPckVuZCB8IHVuZGVmaW5lZDtcbiAgLy8gRE8gTk9UIE1PRElGWSBGUkFHTUVOVCBJVEVNUyBJTiBUSEUgQ09MTEVDVElPTiBXSVRIT1VUIENBTExJTkcgXCJtYXJrRGlydHkoKVwiIGFmdGVyd2FyZHNcbiAgcHJpdmF0ZSBmcmFnbWVudHMgPSBuZXcgRnJhZ21lbnRzKCk7XG4gIHByaXZhdGUgbGFzdFN0YXJ0Um93ID0gMDtcbiAgcHJpdmF0ZSBsYXN0RGlyOiBTdGFydE9yRW5kID0gMTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGNvbnRleHQ6IFBibEluZmluaXRlU2Nyb2xsRFNDb250ZXh0PGFueT4sIG9wdGlvbnM/OiBGcmFnbWVudGVkQmxvY2tDYWNoZU9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB7IC4uLihvcHRpb25zIHx8IHt9KSB9O1xuICB9XG5cbiAgcmVtb3ZlKHN0YXJ0Um93OiBudW1iZXIsIGNvdW50OiBudW1iZXIpOiBSb3dTZXF1ZW5jZVtdIHtcbiAgICByZXR1cm4gdGhpcy5mcmFnbWVudHMucmVtb3ZlKHN0YXJ0Um93LCBjb3VudCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBuZXcgbWF4IHNpemUgZm9yIHRoaXMgY2FjaGUuXG4gICAqIEByZXR1cm5zIFdoZW4gbmV3IG1heCBzaXplIGlzIGJpZ2dlciB0aGUgb2xkICYgY3VycmVudCBzaXplIHZpb2xhdGVzIHRoZSBuZXcgbWF4IHNpemUsIHJldHVybiB0aGUgbnVtYmVyIG9mIGl0ZW1zIHRyaW1tZWQgZnJvbSB0aGUgY2FjaGVcbiAgICogd2l0aCBwb3NpdGl2ZSB2YWx1ZSBpZiB0cmltbWVkIGZyb20gZW5kLCBuZWdhdGl2ZSB2YWx1ZSBpZiB0cmltbWVkIGZyb20gc3RhcnQuIE90aGVyd2lzZSByZXR1cm5zIDAuXG4gICAqL1xuICBzZXRDYWNoZVNpemUobWF4U2l6ZTogbnVtYmVyKTogUm93U2VxdWVuY2VbXSB7XG4gICAgdGhpcy5fbWF4U2l6ZSA9IE1hdGgubWF4KDAsIG1heFNpemUpO1xuICAgIHJldHVybiB0aGlzLmFsaWduQm91bmRhcnkoKTtcbiAgfVxuXG4gIHVwZGF0ZShzdGFydFJvdzogbnVtYmVyLCBlbmRSb3c6IG51bWJlciwgZGlyZWN0aW9uOiBTdGFydE9yRW5kKTogUm93U2VxdWVuY2VbXSB7XG4gICAgdGhpcy5jb2xkTG9jYXRpb24gPSBkaXJlY3Rpb24gPT09IDEgPyAtMSA6IDE7XG4gICAgcmV0dXJuIHRoaXMuYWRkKHN0YXJ0Um93LCBlbmRSb3cpO1xuICB9XG5cbiAgY2xlYXIoKTogUm93U2VxdWVuY2VbXSB7XG4gICAgdGhpcy5jb2xkTG9jYXRpb24gPSB1bmRlZmluZWQ7XG4gICAgaWYgKHRoaXMuZW1wdHkpIHtcbiAgICAgIHJldHVybiBbIFswLCAwXSBdO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5mcmFnbWVudHMuY2xlYXIoKTtcbiAgfVxuXG4gIGNyZWF0ZUJsb2NrKHN0YXJ0SW5kZXg6IG51bWJlciwgZW5kSW5kZXg6IG51bWJlciwgdG90YWxMZW5ndGggPSAwKTogQ2FjaGVCbG9jayB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgWyBkaXJlY3Rpb24sIHN0YXJ0LCBlbmQgXSA9IHRoaXMubWF0Y2hCbG9jayhzdGFydEluZGV4LCBlbmRJbmRleCkgfHwgW107XG5cbiAgICAvLyBMT0coYENSRUFURSBCTE9DSzogWyR7c3RhcnRJbmRleH0sICR7ZW5kSW5kZXh9XSA9PiBbJHtkaXJlY3Rpb259LCAke3N0YXJ0fSwgJHtlbmR9XWApXG4gICAgaWYgKCFkaXJlY3Rpb24pIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29uc3QgeyBibG9ja1NpemUgfSA9IHRoaXMuY29udGV4dC5vcHRpb25zO1xuICAgIGNvbnN0IHsgc3RyaWN0UGFnaW5nIH0gPSB0aGlzLm9wdGlvbnM7XG5cbiAgICBsZXQgZnJvbVJvdzogbnVtYmVyO1xuICAgIGxldCB0b1JvdzogbnVtYmVyO1xuICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICBjYXNlIC0xOlxuICAgICAgICBmcm9tUm93ID0gTWF0aC5tYXgoMCwgZW5kIC0gKGJsb2NrU2l6ZSAtIDEpKTtcbiAgICAgICAgdG9Sb3cgPSBlbmQ7XG4gICAgICAgIGlmICghc3RyaWN0UGFnaW5nICYmIGZyb21Sb3cgPCBzdGFydCkge1xuICAgICAgICAgIGZyb21Sb3cgPSBNYXRoLm1pbih0aGlzLmZyYWdtZW50cy5maW5kQ2xvc2VzdE1pc3NpbmcoZnJvbVJvdywgMSksIHN0YXJ0KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgZnJvbVJvdyA9IHN0YXJ0O1xuICAgICAgICB0b1JvdyA9IHN0YXJ0ICsgYmxvY2tTaXplIC0gMTtcbiAgICAgICAgaWYgKCFzdHJpY3RQYWdpbmcgJiYgdG9Sb3cgPiBlbmQpIHtcbiAgICAgICAgICB0b1JvdyA9IE1hdGgubWF4KHRoaXMuZnJhZ21lbnRzLmZpbmRDbG9zZXN0TWlzc2luZyh0b1JvdywgLTEpLCBlbmQpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmICh0b3RhbExlbmd0aCAmJiBmcm9tUm93ID49IHRvdGFsTGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8vIFN0cmljdCBCbG9jayBsb2dpYzpcbiAgICAvLyBOb3csIHdlIGFsaWduIHRoZSBibG9jayB0byBtYXRjaCBhIHNlcXVlbnRpYWwgd29ybGQgb2YgYmxvY2tzIGJhc2VkIG9uIHRoZSBibG9jayBzaXplLlxuICAgIC8vIElmIHdlIGhhdmUgYSBnYXAgd2Ugd2FudCB0byBkaXZlcnQgdG8gdGhlIG5lYXJlc3QgYmxvY2sgc3RhcnQvZW5kLCBiYXNlZCBvbiB0aGUgZGlyZWN0aW9uLlxuICAgIC8vIElmIHdlIGdvIGRvd24gKGRpcmVjdGlvbiBpcyAxKSB3ZSB3YW50IHRoZSBuZWFyZXN0IGJsb2NrIHN0YXJ0IEJFTE9XIHVzLCBnZXR0aW5nIGR1cGxpY2F0ZXMgaW4gdGhlIGNhbGwgYnV0IGVuc3VyaW5nIG5vIGdhcHMgYWhlYWRcbiAgICAvLyBJZiB3ZSBnbyB1cCAoZGlyZWN0aW9uIGlzIC0xKSB3ZSB3YW50IHRvIG5lYXJlc3QgYmxvY2sgc3RhcnQgQUJPVkUgdXMsIGdldHRpbmcgZHVwbGljYXRlcyBpbiB0aGUgY2FsbCBidXQgZW5zdXJpbmcgbm8gZ2FwcyBhaGVhZC5cbiAgICBpZiAoc3RyaWN0UGFnaW5nKSB7XG4gICAgICBjb25zdCBtYWluID0gZGlyZWN0aW9uID09PSAxID8gZnJvbVJvdyA6IHRvUm93O1xuICAgICAgbGV0IHJlbSA9IG1haW4gJSBibG9ja1NpemU7XG4gICAgICBpZiAocmVtICE9PSAwKSB7XG4gICAgICAgIGZyb21Sb3cgPSBtYWluIC0gcmVtO1xuICAgICAgICB0b1JvdyA9IGZyb21Sb3cgKyBibG9ja1NpemUgLSAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0b3RhbExlbmd0aCAmJiB0b1JvdyA+PSB0b3RhbExlbmd0aCkge1xuICAgICAgdG9Sb3cgPSB0b3RhbExlbmd0aCAtIDE7XG4gICAgICBpZiAoc3RyaWN0UGFnaW5nKSB7XG4gICAgICAgIGZyb21Sb3cgPSB0b1JvdyAtICh0b1JvdyAlIGJsb2NrU2l6ZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gW2RpcmVjdGlvbiwgZnJvbVJvdywgdG9Sb3ddO1xuICB9XG5cbiAgcHJpdmF0ZSBtYXRjaEJsb2NrKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyKTogQ2FjaGVCbG9jayB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKHRoaXMuZW1wdHkpIHtcbiAgICAgIHJldHVybiBbMSwgc3RhcnQsIGVuZF07XG4gICAgfVxuXG4gICAgY29uc3QgaUZpcnN0ID0gdGhpcy5mcmFnbWVudHMuc2VhcmNoUm93UHJveGltaXR5KHN0YXJ0KTtcbiAgICBjb25zdCBpTGFzdCA9IHRoaXMuZnJhZ21lbnRzLnNlYXJjaFJvd1Byb3hpbWl0eShlbmQpO1xuICAgIGlmIChpRmlyc3QgPT09IC0xKSB7XG4gICAgICByZXR1cm4gWzEsIHN0YXJ0LCBlbmRdO1xuICAgIH1cblxuICAgIGNvbnN0IGZpcnN0ID0gdGhpcy5mcmFnbWVudHNbaUZpcnN0XTtcbiAgICBpZiAoaUxhc3QgPT09IC0xKSB7XG4gICAgICByZXR1cm4gWzEsIGZpcnN0LmNvbnRhaW5zUm93KHN0YXJ0KSA/IGZpcnN0LmVuZCArIDEgOiBzdGFydCwgZW5kXTtcbiAgICB9XG5cbiAgICBjb25zdCBpbnRlcnNlY3Rpb25UeXBlID0gZmluZEludGVyc2VjdGlvblR5cGUoZmlyc3QsIG5ldyBGcmFnbWVudChzdGFydCxlbmQpKTtcbiAgICBjb25zdCBkaXIgPSB0aGlzLmxhc3RTdGFydFJvdyA+IHN0YXJ0ID8gLTEgOiB0aGlzLmxhc3RTdGFydFJvdyA9PT0gc3RhcnQgPyB0aGlzLmxhc3REaXIgOiAxO1xuICAgIHRoaXMubGFzdFN0YXJ0Um93ID0gc3RhcnQ7XG4gICAgdGhpcy5sYXN0RGlyID0gZGlyO1xuXG4gICAgLy8gVGhlIGxvZ2ljIGhlcmUgYXNzdW1lcyB0aGF0IHRoZXJlIGFyZSBub3Qgc2VxdWVudGlhbCBibG9ja3MsIChlLmcuIGJsb2NrIDEgWzAsIDk5XSwgYmxvY2sgMiBbMTAwLCAxOTldKVxuICAgIC8vIEFsbCBzZXF1ZW50aWFsIGJsb2NrcyBhcmUgdG8gYmUgbWVyZ2VkIHZpYSBjaGVja0FuZE1lcmdlIG9uIHRoZSBmcmFnbWVudHMgY29sbGVjdGlvblxuICAgIHN3aXRjaCAoaW50ZXJzZWN0aW9uVHlwZSkge1xuICAgICAgY2FzZSBJbnRlcnNlY3Rpb25UeXBlLm5vbmU6XG4gICAgICAgIHJldHVybiBbZGlyLCBzdGFydCwgZW5kXTtcbiAgICAgIGNhc2UgSW50ZXJzZWN0aW9uVHlwZS5wYXJ0aWFsOlxuICAgICAgICBpZiAoaUZpcnN0ID09PSBpTGFzdCkge1xuICAgICAgICAgIGlmIChzdGFydCA8IGZpcnN0LnN0YXJ0KSB7XG4gICAgICAgICAgICByZXR1cm4gW2Rpciwgc3RhcnQsIGZpcnN0LnN0YXJ0IC0gMV07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbZGlyLCBmaXJzdC5lbmQgKyAxLCBlbmRdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBsYXN0ID0gdGhpcy5mcmFnbWVudHNbaUxhc3RdO1xuICAgICAgICAgIHJldHVybiBbZGlyLCBzdGFydCA8IGZpcnN0LnN0YXJ0ID8gc3RhcnQgOiBmaXJzdC5lbmQgKyAxLCBlbmQgPj0gbGFzdC5zdGFydCA/IGxhc3Quc3RhcnQgLSAxIDogZW5kXTtcbiAgICAgICAgfVxuICAgICAgY2FzZSBJbnRlcnNlY3Rpb25UeXBlLmNvbnRhaW5lZDpcbiAgICAgICAgY29uc3QgbGFzdCA9IHRoaXMuZnJhZ21lbnRzW2lMYXN0XTtcbiAgICAgICAgcmV0dXJuIFtkaXIsIHN0YXJ0LCBlbmQgPj0gbGFzdC5zdGFydCA/IGxhc3Quc3RhcnQgLSAxIDogZW5kXTtcbiAgICAgIGNhc2UgSW50ZXJzZWN0aW9uVHlwZS5jb250YWluczpcbiAgICAgIGNhc2UgSW50ZXJzZWN0aW9uVHlwZS5mdWxsOlxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkKHN0YXJ0Um93OiBudW1iZXIsIGVuZFJvdzogbnVtYmVyKTogUm93U2VxdWVuY2VbXSB7XG4gICAgaWYgKHN0YXJ0Um93IDwgMCB8fCBlbmRSb3cgPD0gMCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGNvbnN0IG5ld0ZyYWdtZW50ID0gbmV3IEZyYWdtZW50KHN0YXJ0Um93LCBlbmRSb3cpO1xuICAgIGNvbnN0IGlGaXJzdCA9IHRoaXMuZnJhZ21lbnRzLnNlYXJjaFJvd1Byb3hpbWl0eShzdGFydFJvdyk7XG4gICAgY29uc3QgZmlyc3QgPSB0aGlzLmZyYWdtZW50c1tpRmlyc3RdO1xuICAgIGNvbnN0IGludGVyc2VjdGlvblR5cGUgPSAhZmlyc3QgPyBudWxsIDogZmluZEludGVyc2VjdGlvblR5cGUoZmlyc3QsIG5ld0ZyYWdtZW50KTtcblxuICAgIHN3aXRjaCAoaW50ZXJzZWN0aW9uVHlwZSkge1xuICAgICAgY2FzZSBudWxsOlxuICAgICAgICAvLyBFREdFIENBU0U6IHdoZW4gIFwiZmlyc3RcIiBpcyB1bmRlZmluZWQsIGkuZS4gXCJpRmlyc3RcIiBpcyAtMVxuICAgICAgICAvLyBUaGlzIGVkZ2UgY2FzZSBtZWFucyBubyBwcm94aW1pdHksIGksZS4gdGhlIG5ldyBmcmFnbWVudCBpcyBBRlRFUiB0aGUgbGFzdCBmcmFnbWVudCB3ZSBjdXJyZW50bHkgaGF2ZSAob3Igd2UgaGF2ZSBubyBmcmFnbWVudHMpXG4gICAgICAgIHRoaXMuZnJhZ21lbnRzLnB1c2gobmV3RnJhZ21lbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgSW50ZXJzZWN0aW9uVHlwZS5ub25lOiAvLyBpdCBtZWFucyBmaXJzdCA9PT0gbGFzdFxuICAgICAgICB0aGlzLmZyYWdtZW50cy5zcGxpY2UoaUZpcnN0LCAwLCBuZXdGcmFnbWVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBJbnRlcnNlY3Rpb25UeXBlLnBhcnRpYWw6XG4gICAgICBjYXNlIEludGVyc2VjdGlvblR5cGUuY29udGFpbmVkOlxuICAgICAgICBsZXQgaUxhc3QgPSB0aGlzLmZyYWdtZW50cy5zZWFyY2hSb3dQcm94aW1pdHkoZW5kUm93KTtcbiAgICAgICAgaWYgKGlMYXN0ID09PSAtMSkge1xuICAgICAgICAgIGlMYXN0ID0gdGhpcy5mcmFnbWVudHMubGVuZ3RoIC0gMTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsYXN0ID0gdGhpcy5mcmFnbWVudHNbaUxhc3RdO1xuICAgICAgICBmaXJzdC5zdGFydCA9IE1hdGgubWluKG5ld0ZyYWdtZW50LnN0YXJ0LCBmaXJzdC5zdGFydCk7XG4gICAgICAgIGlmIChuZXdGcmFnbWVudC5lbmQgPj0gbGFzdC5zdGFydCkge1xuICAgICAgICAgIGZpcnN0LmVuZCA9IG5ld0ZyYWdtZW50LmVuZDtcbiAgICAgICAgICB0aGlzLmZyYWdtZW50cy5zcGxpY2UoaUZpcnN0ICsgMSwgaUxhc3QgLSBpRmlyc3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZpcnN0LmVuZCA9IE1hdGgubWF4KG5ld0ZyYWdtZW50LmVuZCwgZmlyc3QuZW5kKTtcbiAgICAgICAgICB0aGlzLmZyYWdtZW50cy5zcGxpY2UoaUZpcnN0ICsgMSwgKGlMYXN0IC0gMSkgLSBpRmlyc3QpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBJbnRlcnNlY3Rpb25UeXBlLmNvbnRhaW5zOlxuICAgICAgY2FzZSBJbnRlcnNlY3Rpb25UeXBlLmZ1bGw6XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICB0aGlzLmZyYWdtZW50cy5tYXJrRGlydHkoKTtcbiAgICB0aGlzLmZyYWdtZW50cy5jaGVja0FuZE1lcmdlKCk7XG4gICAgcmV0dXJuIHRoaXMuYWxpZ25Cb3VuZGFyeSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBvdmVyc2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbWF4U2l6ZSA/IE1hdGgubWF4KHRoaXMuc2l6ZSAtIHRoaXMuX21heFNpemUsIDApIDogMDtcbiAgfVxuXG4gIHByaXZhdGUgYWxpZ25Cb3VuZGFyeSgpOiBSb3dTZXF1ZW5jZVtdIHtcbiAgICBjb25zdCBvdmVyc2l6ZSA9IHRoaXMub3ZlcnNpemUoKTtcbiAgICByZXR1cm4gb3ZlcnNpemUgPiAwID8gdGhpcy5mcmFnbWVudHMucmVtb3ZlSXRlbXMob3ZlcnNpemUsIHRoaXMuY29sZExvY2F0aW9uIHx8IDEpIDogW107XG4gIH1cbn1cbiJdfQ==