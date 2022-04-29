import { Fragment } from './fragment';
export class Fragments extends Array {
    constructor() {
        super(...arguments);
        this.dirty = false;
        this._size = 0;
    }
    get size() {
        if (this.dirty) {
            this.onDirty();
        }
        return this._size;
    }
    remove(startRow, count, startFrom = 0) {
        const result = [];
        const endRow = Fragment.calcEnd(startRow, count);
        const index = this.searchByRow(startRow, startFrom);
        if (index !== -1) {
            const item = this[index];
            const originalEnd = item.end;
            const gap = originalEnd - endRow;
            item.end = startRow - 1;
            if (gap === 0) {
                result.push([startRow, endRow]);
            }
            else if (gap < 0) {
                result.push([startRow, originalEnd], ...this.remove(originalEnd + 1, gap, index + 1));
            }
            else {
                const f = new Fragment(endRow + 1, originalEnd);
                this.splice(index, 0, f);
                result.push([startRow, endRow]);
            }
            if (result.length > 0) {
                this.markDirty();
            }
        }
        return result;
    }
    removeItems(count, location) {
        const result = [];
        let f;
        while (count > 0) {
            f = location === -1 ? this.shift() : this.pop();
            if (!f) {
                break;
            }
            if (f.size > count) {
                if (location === -1) {
                    f.start += count;
                    result.push([f.start - count, f.start - 1]);
                }
                else {
                    f.end -= count;
                    result.push([f.end + 1, f.end + count]);
                }
                count = 0;
            }
            else {
                count = count - f.size;
                result.push([f.start, f.end]);
                f = undefined;
            }
        }
        if (f) {
            if (location === -1) {
                this.unshift(f);
            }
            else {
                this.push(f);
            }
        }
        if (result.length > 0) {
            this.markDirty();
        }
        return result;
    }
    clear() {
        const result = [];
        while (this.length > 0) {
            const f = this.shift();
            result.push([f.start, f.end]);
        }
        if (result.length > 0) {
            this.markDirty();
        }
        return result;
    }
    /**
     * Returns the first row index of a missing row that is the most close (based on the direction) to the provided rowIndex.
     * If the provided rowIndex is missing, returns the provided rowIndex.
     * Note that when the direction is -1 the closest missing row might be -1, i.e. all rows are in-place and nothing is missing
     */
    findClosestMissing(rowIndex, direction) {
        const fragment = this[this.searchByRow(rowIndex)];
        if (fragment) { // we assume fragments must have gaps or else they are merged
            return direction === 1 ? fragment.end + 1 : fragment.start - 1;
        }
        return rowIndex;
    }
    containsRange(startRow, endRow) {
        const first = this[this.searchByRow(startRow)];
        return first && endRow <= first.end; // we assume fragments must have gaps or else they are merged
    }
    /**
     * Search all fragments and find the index of the fragments that contains a specific row index
     */
    searchByRow(rowIndex, startFrom = 0) {
        let end = this.length - 1;
        while (startFrom <= end) {
            let mid = Math.floor((startFrom + end) / 2);
            const item = this[mid];
            if (item.containsRow(rowIndex)) {
                return mid;
            }
            else if (item.end < rowIndex) {
                startFrom = mid + 1;
            }
            else {
                end = mid - 1;
            }
        }
        return -1;
    }
    /**
     * Search for the row that either contain the rowIndex or is the closest to it (from the start)
     * I.e, if no fragment contains the rowIndex, the closest fragment to it will return it's index
     * If The row index is greater then the end of the hightest fragment -1 is returned
     * */
    searchRowProximity(rowIndex, startFrom = 0) {
        let end = this.length - 1;
        let mostProximate = -1;
        while (startFrom <= end) {
            let mid = Math.floor((startFrom + end) / 2);
            const item = this[mid];
            if (item.containsRow(rowIndex)) {
                return mid;
            }
            else if (item.end < rowIndex) {
                startFrom = mid + 1;
            }
            else {
                mostProximate = mid;
                end = mid - 1;
            }
        }
        return mostProximate;
    }
    markDirty() {
        this.dirty = true;
    }
    /**
     * Check and verify that there are no sequential blocks (e.g. block 1 [0, 99], block 2 [100, 199])
     * If there are, merge them into a single block
     */
    checkAndMerge() {
        for (let i = 1; i < this.length; i++) {
            if (this[i - 1].end + 1 === this[i].start) {
                this[i - 1].end = this[i].end;
                this.splice(i, 1);
                i -= 1;
            }
        }
    }
    onDirty() {
        this.dirty = false;
        this._size = this.reduce((s, f) => s + f.size, 0);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhZ21lbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3JpZC9pbmZpbml0ZS1zY3JvbGwvc3JjL2xpYi9pbmZpbml0ZS1zY3JvbGwtZGF0YS1zb3VyY2UvY2FjaGluZy9mcmFnbWVudGVkLWJsb2NrLWNhY2hlL2ZyYWdtZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRXRDLE1BQU0sT0FBTyxTQUFVLFNBQVEsS0FBZTtJQUE5Qzs7UUFFVSxVQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2QsVUFBSyxHQUFXLENBQUMsQ0FBQztJQStLNUIsQ0FBQztJQTdLQyxJQUFJLElBQUk7UUFDTixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDaEI7UUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFnQixFQUFFLEtBQWEsRUFBRSxTQUFTLEdBQUcsQ0FBQztRQUNuRCxNQUFNLE1BQU0sR0FBa0IsRUFBRSxDQUFDO1FBQ2pDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRXBELElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2hCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1lBRTdCLE1BQU0sR0FBRyxHQUFHLFdBQVcsR0FBRyxNQUFNLENBQUM7WUFFakMsSUFBSSxDQUFDLEdBQUcsR0FBRyxRQUFRLEdBQUcs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SUFFRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7T0FHRztJQUNILGFBQWE7UUFDWCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFO2dCQUN6QyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO2dCQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDbEIsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNSO1NBQ0Y7SUFDSCxDQUFDO0lBRU8sT0FBTztRQUNiLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvd1NlcXVlbmNlLCBTdGFydE9yRW5kIH0gZnJvbSAnLi4vY2FjaGUtYWRhcHRlcic7XG5pbXBvcnQgeyBGcmFnbWVudCB9IGZyb20gJy4vZnJhZ21lbnQnO1xuXG5leHBvcnQgY2xhc3MgRnJhZ21lbnRzIGV4dGVuZHMgQXJyYXk8RnJhZ21lbnQ+IHtcblxuICBwcml2YXRlIGRpcnR5ID0gZmFsc2U7XG4gIHByaXZhdGUgX3NpemU6IG51bWJlciA9IDA7XG5cbiAgZ2V0IHNpemUoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5kaXJ0eSkge1xuICAgICAgdGhpcy5vbkRpcnR5KCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9zaXplO1xuICB9XG5cbiAgcmVtb3ZlKHN0YXJ0Um93OiBudW1iZXIsIGNvdW50OiBudW1iZXIsIHN0YXJ0RnJvbSA9IDApOiBSb3dTZXF1ZW5jZVtdIHtcbiAgICBjb25zdCByZXN1bHQ6IFJvd1NlcXVlbmNlW10gPSBbXTtcbiAgICBjb25zdCBlbmRSb3cgPSBGcmFnbWVudC5jYWxjRW5kKHN0YXJ0Um93LCBjb3VudCk7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnNlYXJjaEJ5Um93KHN0YXJ0Um93LCBzdGFydEZyb20pO1xuXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgY29uc3QgaXRlbSA9IHRoaXNbaW5kZXhdO1xuICAgICAgY29uc3Qgb3JpZ2luYWxFbmQgPSBpdGVtLmVuZDtcblxuICAgICAgY29uc3QgZ2FwID0gb3JpZ2luYWxFbmQgLSBlbmRSb3c7XG5cbiAgICAgIGl0ZW0uZW5kID0gc3RhcnRSb3cgLSAxO1xuXG4gICAgICBpZiAoZ2FwID09PSAwKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKFtzdGFydFJvdywgZW5kUm93XSk7XG4gICAgICB9IGVsc2UgaWYgKGdhcCA8IDApIHtcbiAgICAgICAgcmVzdWx0LnB1c2goW3N0YXJ0Um93LCBvcmlnaW5hbEVuZF0sIC4uLnRoaXMucmVtb3ZlKG9yaWdpbmFsRW5kICsgMSwgZ2FwLCBpbmRleCArIDEpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGYgPSBuZXcgRnJhZ21lbnQoZW5kUm93ICsgMSwgb3JpZ2luYWxFbmQpO1xuICAgICAgICB0aGlzLnNwbGljZShpbmRleCwgMCwgZik7XG4gICAgICAgIHJlc3VsdC5wdXNoKFtzdGFydFJvdywgZW5kUm93XSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXN1bHQubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLm1hcmtEaXJ0eSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICByZW1vdmVJdGVtcyhjb3VudDogbnVtYmVyLCBsb2NhdGlvbjogU3RhcnRPckVuZCk6IFJvd1NlcXVlbmNlW10ge1xuICAgIGNvbnN0IHJlc3VsdDogUm93U2VxdWVuY2VbXSA9IFtdO1xuICAgIGxldCBmOiBGcmFnbWVudDtcbiAgICB3aGlsZSAoY291bnQgPiAwKSB7XG4gICAgICBmID0gbG9jYXRpb24gPT09IC0xID8gdGhpcy5zaGlmdCgpIDogdGhpcy5wb3AoKTtcbiAgICAgIGlmICghZikge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaWYgKGYuc2l6ZSA+IGNvdW50KSB7XG4gICAgICAgIGlmIChsb2NhdGlvbiA9PT0gLTEpIHtcbiAgICAgICAgICBmLnN0YXJ0ICs9IGNvdW50O1xuICAgICAgICAgIHJlc3VsdC5wdXNoKFtmLnN0YXJ0IC0gY291bnQsIGYuc3RhcnQgLSAxXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZi5lbmQgLT0gY291bnQ7XG4gICAgICAgICAgcmVzdWx0LnB1c2goW2YuZW5kICsgMSwgZi5lbmQgKyBjb3VudF0pO1xuICAgICAgICB9XG4gICAgICAgIGNvdW50ID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvdW50ID0gY291bnQgLSBmLnNpemU7XG4gICAgICAgIHJlc3VsdC5wdXNoKFtmLnN0YXJ0LCBmLmVuZF0pO1xuICAgICAgICBmID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZikge1xuICAgICAgaWYgKGxvY2F0aW9uID09PSAtMSkge1xuICAgICAgICB0aGlzLnVuc2hpZnQoZik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnB1c2goZik7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChyZXN1bHQubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5tYXJrRGlydHkoKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGNsZWFyKCk6IFJvd1NlcXVlbmNlW10ge1xuICAgIGNvbnN0IHJlc3VsdDogUm93U2VxdWVuY2VbXSA9IFtdO1xuICAgIHdoaWxlICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGYgPSB0aGlzLnNoaWZ0KCk7XG4gICAgICByZXN1bHQucHVzaChbZi5zdGFydCwgZi5lbmRdKTtcbiAgICB9XG4gICAgaWYgKHJlc3VsdC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLm1hcmtEaXJ0eSgpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGZpcnN0IHJvdyBpbmRleCBvZiBhIG1pc3Npbmcgcm93IHRoYXQgaXMgdGhlIG1vc3QgY2xvc2UgKGJhc2VkIG9uIHRoZSBkaXJlY3Rpb24pIHRvIHRoZSBwcm92aWRlZCByb3dJbmRleC5cbiAgICogSWYgdGhlIHByb3ZpZGVkIHJvd0luZGV4IGlzIG1pc3NpbmcsIHJldHVybnMgdGhlIHByb3ZpZGVkIHJvd0luZGV4LlxuICAgKiBOb3RlIHRoYXQgd2hlbiB0aGUgZGlyZWN0aW9uIGlzIC0xIHRoZSBjbG9zZXN0IG1pc3Npbmcgcm93IG1pZ2h0IGJlIC0xLCBpLmUuIGFsbCByb3dzIGFyZSBpbi1wbGFjZSBhbmQgbm90aGluZyBpcyBtaXNzaW5nXG4gICAqL1xuICBmaW5kQ2xvc2VzdE1pc3Npbmcocm93SW5kZXg6IG51bWJlciwgZGlyZWN0aW9uOiBTdGFydE9yRW5kKSB7XG4gICAgY29uc3QgZnJhZ21lbnQgPSB0aGlzW3RoaXMuc2VhcmNoQnlSb3cocm93SW5kZXgpXTtcbiAgICBpZiAoZnJhZ21lbnQpIHsgLy8gd2UgYXNzdW1lIGZyYWdtZW50cyBtdXN0IGhhdmUgZ2FwcyBvciBlbHNlIHRoZXkgYXJlIG1lcmdlZFxuICAgICAgcmV0dXJuIGRpcmVjdGlvbiA9PT0gMSA/IGZyYWdtZW50LmVuZCArIDEgOiBmcmFnbWVudC5zdGFydCAtIDE7XG4gICAgfVxuICAgIHJldHVybiByb3dJbmRleDtcbiAgfVxuXG4gIGNvbnRhaW5zUmFuZ2Uoc3RhcnRSb3c6IG51bWJlciwgZW5kUm93OiBudW1iZXIpIHtcbiAgICBjb25zdCBmaXJzdCA9IHRoaXNbdGhpcy5zZWFyY2hCeVJvdyhzdGFydFJvdyldO1xuICAgIHJldHVybiBmaXJzdCAmJiBlbmRSb3cgPD0gZmlyc3QuZW5kOyAvLyB3ZSBhc3N1bWUgZnJhZ21lbnRzIG11c3QgaGF2ZSBnYXBzIG9yIGVsc2UgdGhleSBhcmUgbWVyZ2VkXG4gIH1cblxuICAvKipcbiAgICogU2VhcmNoIGFsbCBmcmFnbWVudHMgYW5kIGZpbmQgdGhlIGluZGV4IG9mIHRoZSBmcmFnbWVudHMgdGhhdCBjb250YWlucyBhIHNwZWNpZmljIHJvdyBpbmRleFxuICAgKi9cbiAgc2VhcmNoQnlSb3cocm93SW5kZXg6IG51bWJlciwgc3RhcnRGcm9tID0gMCkge1xuICAgIGxldCBlbmQgPSB0aGlzLmxlbmd0aCAtIDE7XG5cbiAgICB3aGlsZSAoc3RhcnRGcm9tIDw9IGVuZCl7XG4gICAgICBsZXQgbWlkID0gTWF0aC5mbG9vcigoc3RhcnRGcm9tICsgZW5kKSAvIDIpO1xuICAgICAgY29uc3QgaXRlbSA9IHRoaXNbbWlkXTtcbiAgICAgIGlmIChpdGVtLmNvbnRhaW5zUm93KHJvd0luZGV4KSkge1xuICAgICAgICByZXR1cm4gbWlkO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXRlbS5lbmQgPCByb3dJbmRleCkge1xuICAgICAgICBzdGFydEZyb20gPSBtaWQgKyAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZW5kID0gbWlkIC0gMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICAvKipcbiAgICogU2VhcmNoIGZvciB0aGUgcm93IHRoYXQgZWl0aGVyIGNvbnRhaW4gdGhlIHJvd0luZGV4IG9yIGlzIHRoZSBjbG9zZXN0IHRvIGl0IChmcm9tIHRoZSBzdGFydClcbiAgICogSS5lLCBpZiBubyBmcmFnbWVudCBjb250YWlucyB0aGUgcm93SW5kZXgsIHRoZSBjbG9zZXN0IGZyYWdtZW50IHRvIGl0IHdpbGwgcmV0dXJuIGl0J3MgaW5kZXhcbiAgICogSWYgVGhlIHJvdyBpbmRleCBpcyBncmVhdGVyIHRoZW4gdGhlIGVuZCBvZiB0aGUgaGlnaHRlc3QgZnJhZ21lbnQgLTEgaXMgcmV0dXJuZWRcbiAgICogKi9cbiAgc2VhcmNoUm93UHJveGltaXR5KHJvd0luZGV4OiBudW1iZXIsIHN0YXJ0RnJvbSA9IDApIHtcbiAgICBsZXQgZW5kID0gdGhpcy5sZW5ndGggLSAxO1xuXG4gICAgbGV0IG1vc3RQcm94aW1hdGUgPSAtMTtcbiAgICB3aGlsZSAoc3RhcnRGcm9tIDw9IGVuZCl7XG4gICAgICBsZXQgbWlkID0gTWF0aC5mbG9vcigoc3RhcnRGcm9tICsgZW5kKSAvIDIpO1xuICAgICAgY29uc3QgaXRlbSA9IHRoaXNbbWlkXTtcbiAgICAgIGlmIChpdGVtLmNvbnRhaW5zUm93KHJvd0luZGV4KSkge1xuICAgICAgICByZXR1cm4gbWlkO1xuICAgICAgfSBlbHNlIGlmIChpdGVtLmVuZCA8IHJvd0luZGV4KSB7XG4gICAgICAgIHN0YXJ0RnJvbSA9IG1pZCArIDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtb3N0UHJveGltYXRlID0gbWlkO1xuICAgICAgICBlbmQgPSBtaWQgLSAxO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbW9zdFByb3hpbWF0ZTtcbiAgfVxuXG4gIG1hcmtEaXJ0eSgpIHtcbiAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBhbmQgdmVyaWZ5IHRoYXQgdGhlcmUgYXJlIG5vIHNlcXVlbnRpYWwgYmxvY2tzIChlLmcuIGJsb2NrIDEgWzAsIDk5XSwgYmxvY2sgMiBbMTAwLCAxOTldKVxuICAgKiBJZiB0aGVyZSBhcmUsIG1lcmdlIHRoZW0gaW50byBhIHNpbmdsZSBibG9ja1xuICAgKi9cbiAgY2hlY2tBbmRNZXJnZSgpIHtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzW2kgLSAxXS5lbmQgKyAxID09PSB0aGlzW2ldLnN0YXJ0KSB7XG4gICAgICAgIHRoaXNbaSAtIDFdLmVuZCA9IHRoaXNbaV0uZW5kO1xuICAgICAgICB0aGlzLnNwbGljZShpLCAxKTtcbiAgICAgICAgaSAtPSAxO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25EaXJ0eSgpIHtcbiAgICB0aGlzLmRpcnR5ID0gZmFsc2U7XG4gICAgdGhpcy5fc2l6ZSA9IHRoaXMucmVkdWNlKCAocywgZikgPT4gcyArIGYuc2l6ZSwgMCk7XG4gIH1cbn1cbiJdfQ==