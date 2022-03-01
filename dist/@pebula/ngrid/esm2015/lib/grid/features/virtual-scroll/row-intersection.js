import { Subject } from 'rxjs';
export class RowIntersectionTracker {
    constructor(rootElement, forceManual) {
        const intersectionChanged = this.intersectionChanged = new Subject();
        if (!forceManual && !!IntersectionObserver) {
            this.intersectionObserver = new IntersectionObserver(entries => intersectionChanged.next(entries), {
                root: rootElement,
                rootMargin: '0px',
                threshold: 0.0,
            });
        }
    }
    get observerMode() { return !!this.intersectionObserver; }
    snapshot() {
        var _a, _b;
        return (_b = (_a = this.intersectionObserver) === null || _a === void 0 ? void 0 : _a.takeRecords()) !== null && _b !== void 0 ? _b : [];
    }
    track(element) {
        var _a;
        (_a = this.intersectionObserver) === null || _a === void 0 ? void 0 : _a.observe(element);
    }
    untrack(element) {
        var _a;
        (_a = this.intersectionObserver) === null || _a === void 0 ? void 0 : _a.unobserve(element);
    }
    destroy() {
        var _a;
        this.intersectionChanged.complete();
        (_a = this.intersectionObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LWludGVyc2VjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmdyaWQvc3JjL2xpYi9ncmlkL2ZlYXR1cmVzL3ZpcnR1YWwtc2Nyb2xsL3Jvdy1pbnRlcnNlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUzQyxNQUFNLE9BQU8sc0JBQXNCO0lBTWpDLFlBQVksV0FBd0IsRUFBRSxXQUFxQjtRQUN6RCxNQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLE9BQU8sRUFBK0IsQ0FBQztRQUVsRyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxvQkFBb0IsRUFBRTtZQUMxQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDakcsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixTQUFTLEVBQUUsR0FBRzthQUNmLENBQUMsQ0FBQztTQUNKO0lBRUgsQ0FBQztJQWhCRCxJQUFJLFlBQVksS0FBSyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO0lBa0IxRCxRQUFROztRQUNOLE9BQU8sTUFBQSxNQUFBLElBQUksQ0FBQyxvQkFBb0IsMENBQUUsV0FBVyxFQUFFLG1DQUFJLEVBQUUsQ0FBQztJQUN4RCxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQW9COztRQUN4QixNQUFBLElBQUksQ0FBQyxvQkFBb0IsMENBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxPQUFPLENBQUMsT0FBb0I7O1FBQzFCLE1BQUEsSUFBSSxDQUFDLG9CQUFvQiwwQ0FBRSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELE9BQU87O1FBQ0osSUFBSSxDQUFDLG1CQUFvQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3RELE1BQUEsSUFBSSxDQUFDLG9CQUFvQiwwQ0FBRSxVQUFVLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBjbGFzcyBSb3dJbnRlcnNlY3Rpb25UcmFja2VyIHtcbiAgZ2V0IG9ic2VydmVyTW9kZSgpIHsgcmV0dXJuICEhdGhpcy5pbnRlcnNlY3Rpb25PYnNlcnZlcjsgfVxuXG4gIHJlYWRvbmx5IGludGVyc2VjdGlvbkNoYW5nZWQ6IE9ic2VydmFibGU8SW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeVtdPjtcbiAgcHJpdmF0ZSByZWFkb25seSBpbnRlcnNlY3Rpb25PYnNlcnZlcjogSW50ZXJzZWN0aW9uT2JzZXJ2ZXI7XG5cbiAgY29uc3RydWN0b3Iocm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBmb3JjZU1hbnVhbD86IGJvb2xlYW4pIHtcbiAgICBjb25zdCBpbnRlcnNlY3Rpb25DaGFuZ2VkID0gdGhpcy5pbnRlcnNlY3Rpb25DaGFuZ2VkID0gbmV3IFN1YmplY3Q8SW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeVtdPigpO1xuXG4gICAgaWYgKCFmb3JjZU1hbnVhbCAmJiAhIUludGVyc2VjdGlvbk9ic2VydmVyKSB7XG4gICAgICB0aGlzLmludGVyc2VjdGlvbk9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGVudHJpZXMgPT4gaW50ZXJzZWN0aW9uQ2hhbmdlZC5uZXh0KGVudHJpZXMpLCB7XG4gICAgICAgIHJvb3Q6IHJvb3RFbGVtZW50LFxuICAgICAgICByb290TWFyZ2luOiAnMHB4JyxcbiAgICAgICAgdGhyZXNob2xkOiAwLjAsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgfVxuXG4gIHNuYXBzaG90KCkge1xuICAgIHJldHVybiB0aGlzLmludGVyc2VjdGlvbk9ic2VydmVyPy50YWtlUmVjb3JkcygpID8/IFtdO1xuICB9XG5cbiAgdHJhY2soZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICB0aGlzLmludGVyc2VjdGlvbk9ic2VydmVyPy5vYnNlcnZlKGVsZW1lbnQpO1xuICB9XG5cbiAgdW50cmFjayhlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIHRoaXMuaW50ZXJzZWN0aW9uT2JzZXJ2ZXI/LnVub2JzZXJ2ZShlbGVtZW50KTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgKHRoaXMuaW50ZXJzZWN0aW9uQ2hhbmdlZCBhcyBTdWJqZWN0PGFueT4pLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5pbnRlcnNlY3Rpb25PYnNlcnZlcj8uZGlzY29ubmVjdCgpO1xuICB9XG59XG4iXX0=