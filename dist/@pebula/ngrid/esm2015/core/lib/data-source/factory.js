import { PblDataSource } from './data-source';
import { PblDataSourceAdapter } from './adapter/adapter';
import { PblDataSourceBaseFactory } from './base/factory';
export class PblDataSourceFactory extends PblDataSourceBaseFactory {
    createAdapter() {
        return new PblDataSourceAdapter(this._adapter.onTrigger, this._adapter.customTriggers || false);
    }
    createDataSource(adapter) {
        return new PblDataSource(adapter, this._dsOptions);
    }
}
export function createDS() {
    return new PblDataSourceFactory();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmdyaWQvY29yZS9zcmMvbGliL2RhdGEtc291cmNlL2ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUxRCxNQUFNLE9BQU8sb0JBQXFDLFNBQVEsd0JBQWtDO0lBQ2hGLGFBQWE7UUFDckIsT0FBTyxJQUFJLG9CQUFvQixDQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxJQUFJLEtBQUssQ0FBQyxDQUFDO0lBQzVHLENBQUM7SUFFUyxnQkFBZ0IsQ0FBQyxPQUF1QztRQUNoRSxPQUFPLElBQUksYUFBYSxDQUFXLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0QsQ0FBQztDQUNGO0FBRUQsTUFBTSxVQUFVLFFBQVE7SUFDdEIsT0FBTyxJQUFJLG9CQUFvQixFQUFZLENBQUM7QUFDOUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibERhdGFTb3VyY2UgfSBmcm9tICcuL2RhdGEtc291cmNlJztcbmltcG9ydCB7IFBibERhdGFTb3VyY2VBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVyL2FkYXB0ZXInO1xuaW1wb3J0IHsgUGJsRGF0YVNvdXJjZUJhc2VGYWN0b3J5IH0gZnJvbSAnLi9iYXNlL2ZhY3RvcnknO1xuXG5leHBvcnQgY2xhc3MgUGJsRGF0YVNvdXJjZUZhY3Rvcnk8VCwgVERhdGEgPSBhbnk+IGV4dGVuZHMgUGJsRGF0YVNvdXJjZUJhc2VGYWN0b3J5PFQsIFREYXRhPiB7XG4gIHByb3RlY3RlZCBjcmVhdGVBZGFwdGVyKCk6IFBibERhdGFTb3VyY2VBZGFwdGVyPFQsIFREYXRhPiB7XG4gICAgcmV0dXJuIG5ldyBQYmxEYXRhU291cmNlQWRhcHRlcjxULCBURGF0YT4odGhpcy5fYWRhcHRlci5vblRyaWdnZXIsIHRoaXMuX2FkYXB0ZXIuY3VzdG9tVHJpZ2dlcnMgfHwgZmFsc2UpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZURhdGFTb3VyY2UoYWRhcHRlcjogUGJsRGF0YVNvdXJjZUFkYXB0ZXI8VCwgVERhdGE+KTogUGJsRGF0YVNvdXJjZTxULCBURGF0YT4ge1xuICAgIHJldHVybiBuZXcgUGJsRGF0YVNvdXJjZTxULCBURGF0YT4oYWRhcHRlciwgdGhpcy5fZHNPcHRpb25zKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRFM8VCwgVERhdGEgPSBUW10+KCk6IFBibERhdGFTb3VyY2VGYWN0b3J5PFQsIFREYXRhPiB7XG4gIHJldHVybiBuZXcgUGJsRGF0YVNvdXJjZUZhY3Rvcnk8VCwgVERhdGE+KCk7XG59XG4iXX0=