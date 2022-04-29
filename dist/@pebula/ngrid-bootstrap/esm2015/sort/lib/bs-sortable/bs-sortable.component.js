import { merge } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { unrx } from '@pebula/ngrid/core';
import { PblNgridBsSortablePlugin } from '../bs-sortable-plugin';
import * as i0 from "@angular/core";
import * as i1 from "../bs-sortable-plugin";
export class PblNgridBsSortable {
    constructor(cdRef, plugin) {
        this.plugin = plugin;
        merge(plugin.sortChange, plugin._stateChanges)
            .subscribe(() => {
            if (this._isSorted()) {
                this._updateArrowDirection();
            }
            cdRef.markForCheck();
        });
    }
    ngOnInit() {
        // Initialize the direction of the arrow and set the view state to be immediately that state.
        this._updateArrowDirection();
        this.plugin.register(this);
    }
    ngOnDestroy() {
        this.plugin.deregister(this);
        unrx.kill(this);
    }
    _handleClick() {
        if (!this._isDisabled()) {
            this._toggleOnInteraction();
        }
    }
    _updateArrowDirection() {
        this._direction = this._isSorted()
            ? this.plugin.direction
            : (this.start || this.plugin.start);
    }
    _isAfter() {
        return this.plugin.bsArrowPosition === 'after';
    }
    /** Whether this PblNgridBsSortable is currently sorted in either ascending or descending order. */
    _isSorted() {
        return this.plugin.active == this.id && (this.plugin.direction === 'asc' || this.plugin.direction === 'desc');
    }
    _isDisabled() {
        return this.plugin.bsSortableDisabled; //|| this.disabled;
    }
    /** Triggers the sort on this sort header and removes the indicator hint. */
    _toggleOnInteraction() {
        this.plugin.sort(this);
    }
}
/** @nocollapse */ PblNgridBsSortable.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsSortable, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.PblNgridBsSortablePlugin }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ PblNgridBsSortable.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridBsSortable, selector: "pbl-bs-sortable", host: { listeners: { "click": "_handleClick()" } }, ngImport: i0, template: "<div class=\"pbl-bs-sortable\"\n     [class.pbl-bs-sortable-after]=\"_isAfter()\"\n     [class.pbl-bs-sortable-sorted]=\"_isSorted()\"\n     [class.pbl-bs-sortable-disabled]=\"_isDisabled()\"\n     [class.asc]=\"_direction === 'asc'\"\n     [class.desc]=\"_direction === 'desc'\"\n     role=\"button\">\n\n  <ng-content></ng-content>\n</div>\n", styles: [".pbl-bs-sortable{cursor:pointer;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-select:none}.pbl-bs-sortable.pbl-bs-sortable-sorted{position:relative}.pbl-bs-sortable.pbl-bs-sortable-sorted:before{content:\"\";display:block;position:absolute;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAmxJREFUeAHtmksrRVEUx72fH8CIGQNJkpGUUmakDEiZSJRIZsRQmCkTJRmZmJgQE0kpX0D5DJKJgff7v+ru2u3O3vvc67TOvsdatdrnnP1Y///v7HvvubdbUiIhBISAEBACQkAICAEhIAQ4CXSh2DnyDfmCPEG2Iv9F9MPlM/LHyAecdyMzHYNwR3fdNK/OH9HXl1UCozD24TCvILxizEDWIEzA0FcM8woCgRrJCoS5PIwrANQSMAJX1LEI9bqpQo4JYNFFKRSvIgsxHDVnqZgIkPnNBM0rIGtYk9YOOsqgbgepRCfdbmFtqhFkVEDVPjJp0+Z6e6hRHhqBKgg6ZDCvYBygVmUoEGoh5JTRvIJwhJo1aUOoh4CLPMyvxxi7EWOMgnCGsXXI1GIXlZUYX7ucU+kbR8NW8lh3O7cue0Pk32MKndfUxQFAwxdirk3fHappAnc0oqDPzDfGTBrCfHP04dM4oTV8cxr0SVzH9FF07xD3ib6xCDE+M+aUcVygtWzzbtGX2rPBrEUYfecfQkaFzYi6HjVnGBdtL7epqAlc1+jRdAap74RrnPc4BCijttY2tRcdN0g17w7HqZrXhdJTYAuS3hd8z+vKgK3V1zWPae0mZDMykadBn1hTQBLnZNwVrJpSe/NwEeDsEwCctEOsJTsgxLvCqUl2ACftEGvJDgjxrnBqkh3ASTvEWrIDQrwrnJpkB3DSDrGW7IAQ7wqnJtkBnLRztejXXVu4+mxz/nQ9jR1w5VB86ejLTFcnnDwhzV+F6T+CHZlx6THSjn76eyyBIOPHyDakhBAQAkJACAgBISAEhIAQYCLwC8JxpAmsEGt6AAAAAElFTkSuQmCC\") no-repeat;background-size:22px;width:22px;height:22px;margin-left:-22px}.pbl-bs-sortable.pbl-bs-sortable-sorted.pbl-bs-sortable-after:before{right:0;transform:translateX(100%);-ms-transform:translateX(100%)}.pbl-bs-sortable.pbl-bs-sortable-sorted.desc:before{transform:rotate(180deg);-ms-transform:rotate(180deg)}.pbl-bs-sortable.pbl-bs-sortable-sorted.desc.pbl-bs-sortable-after:before{transform:translateX(100%) rotate(180deg);-ms-transform:translateX(100%) rotate(180deg)}"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsSortable, decorators: [{
            type: Component,
            args: [{
                    selector: 'pbl-bs-sortable',
                    templateUrl: './bs-sortable.component.html',
                    styleUrls: ['./bs-sortable.component.scss'],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        '(click)': '_handleClick()',
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.PblNgridBsSortablePlugin }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtc29ydGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3JpZC1ib290c3RyYXAvc29ydC9zcmMvbGliL2JzLXNvcnRhYmxlL2JzLXNvcnRhYmxlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmdyaWQtYm9vdHN0cmFwL3NvcnQvc3JjL2xpYi9icy1zb3J0YWJsZS9icy1zb3J0YWJsZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzFDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7QUFhakUsTUFBTSxPQUFPLGtCQUFrQjtJQVk3QixZQUFZLEtBQXdCLEVBQVUsTUFBZ0M7UUFBaEMsV0FBTSxHQUFOLE1BQU0sQ0FBMEI7UUFDNUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLGFBQWEsQ0FBQzthQUN6QyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2FBQzlCO1lBRUQsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ1QsQ0FBQztJQUVELFFBQVE7UUFDTiw2RkFBNkY7UUFDN0YsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFFN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUN2QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztTQUM3QjtJQUNILENBQUM7SUFDRCxxQkFBcUI7UUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVM7WUFDdkIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUNwQztJQUNILENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsS0FBSyxPQUFPLENBQUM7SUFDakQsQ0FBQztJQUVELG1HQUFtRztJQUNuRyxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxLQUFLLE1BQU0sQ0FBQyxDQUFDO0lBQ2hILENBQUM7SUFFRCxXQUFXO1FBQ1QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsbUJBQW1CO0lBQzVELENBQUM7SUFFRCw0RUFBNEU7SUFDNUUsb0JBQW9CO1FBRWxCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7O2tJQWhFVSxrQkFBa0I7c0hBQWxCLGtCQUFrQiwyR0NoQi9CLHlWQVVBOzJGRE1hLGtCQUFrQjtrQkFWOUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixXQUFXLEVBQUUsOEJBQThCO29CQUMzQyxTQUFTLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztvQkFDM0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxJQUFJLEVBQUU7d0JBQ0osU0FBUyxFQUFFLGdCQUFnQjtxQkFDNUI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBtZXJnZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB1bnJ4IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZC9jb3JlJztcbmltcG9ydCB7IFBibE5ncmlkQnNTb3J0YWJsZVBsdWdpbiB9IGZyb20gJy4uL2JzLXNvcnRhYmxlLXBsdWdpbic7XG5pbXBvcnQgeyBQYmxOZ3JpZEJzU29ydERpcmVjdGlvbiwgUGJsTmdyaWRTb3J0YWJsZSB9IGZyb20gJy4uL3R5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGJsLWJzLXNvcnRhYmxlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2JzLXNvcnRhYmxlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYnMtc29ydGFibGUuY29tcG9uZW50LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICAnKGNsaWNrKSc6ICdfaGFuZGxlQ2xpY2soKScsXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRCc1NvcnRhYmxlIGltcGxlbWVudHMgUGJsTmdyaWRTb3J0YWJsZSB7XG5cbiAgaWQ6IHN0cmluZztcblxuICAvKiogU3RhcnRpbmcgc29ydCBkaXJlY3Rpb24uICovXG4gIHN0YXJ0OiAnYXNjJyB8ICdkZXNjJztcblxuICAvKiogV2hldGhlciB0byBkaXNhYmxlIGNsZWFyaW5nIHRoZSBzb3J0aW5nIHN0YXRlLiAqL1xuICBkaXNhYmxlQ2xlYXI6IGJvb2xlYW47XG5cbiAgX2RpcmVjdGlvbjogUGJsTmdyaWRCc1NvcnREaXJlY3Rpb247XG5cbiAgY29uc3RydWN0b3IoY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIHBsdWdpbjogUGJsTmdyaWRCc1NvcnRhYmxlUGx1Z2luKSB7XG4gICAgbWVyZ2UocGx1Z2luLnNvcnRDaGFuZ2UsIHBsdWdpbi5fc3RhdGVDaGFuZ2VzKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5faXNTb3J0ZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQXJyb3dEaXJlY3Rpb24oKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBJbml0aWFsaXplIHRoZSBkaXJlY3Rpb24gb2YgdGhlIGFycm93IGFuZCBzZXQgdGhlIHZpZXcgc3RhdGUgdG8gYmUgaW1tZWRpYXRlbHkgdGhhdCBzdGF0ZS5cbiAgICB0aGlzLl91cGRhdGVBcnJvd0RpcmVjdGlvbigpO1xuXG4gICAgdGhpcy5wbHVnaW4ucmVnaXN0ZXIodGhpcyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnBsdWdpbi5kZXJlZ2lzdGVyKHRoaXMpO1xuICAgIHVucngua2lsbCh0aGlzKTtcbiAgfVxuXG4gIF9oYW5kbGVDbGljaygpIHtcbiAgICBpZiAoIXRoaXMuX2lzRGlzYWJsZWQoKSkge1xuICAgICAgdGhpcy5fdG9nZ2xlT25JbnRlcmFjdGlvbigpO1xuICAgIH1cbiAgfVxuICBfdXBkYXRlQXJyb3dEaXJlY3Rpb24oKSB7XG4gICAgdGhpcy5fZGlyZWN0aW9uID0gdGhpcy5faXNTb3J0ZWQoKVxuICAgICAgPyB0aGlzLnBsdWdpbi5kaXJlY3Rpb25cbiAgICAgIDogKHRoaXMuc3RhcnQgfHwgdGhpcy5wbHVnaW4uc3RhcnQpXG4gICAgO1xuICB9XG5cbiAgX2lzQWZ0ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucGx1Z2luLmJzQXJyb3dQb3NpdGlvbiA9PT0gJ2FmdGVyJztcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoaXMgUGJsTmdyaWRCc1NvcnRhYmxlIGlzIGN1cnJlbnRseSBzb3J0ZWQgaW4gZWl0aGVyIGFzY2VuZGluZyBvciBkZXNjZW5kaW5nIG9yZGVyLiAqL1xuICBfaXNTb3J0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMucGx1Z2luLmFjdGl2ZSA9PSB0aGlzLmlkICYmICh0aGlzLnBsdWdpbi5kaXJlY3Rpb24gPT09ICdhc2MnIHx8IHRoaXMucGx1Z2luLmRpcmVjdGlvbiA9PT0gJ2Rlc2MnKTtcbiAgfVxuXG4gIF9pc0Rpc2FibGVkKCkge1xuICAgIHJldHVybiB0aGlzLnBsdWdpbi5ic1NvcnRhYmxlRGlzYWJsZWQ7IC8vfHwgdGhpcy5kaXNhYmxlZDtcbiAgfVxuXG4gIC8qKiBUcmlnZ2VycyB0aGUgc29ydCBvbiB0aGlzIHNvcnQgaGVhZGVyIGFuZCByZW1vdmVzIHRoZSBpbmRpY2F0b3IgaGludC4gKi9cbiAgX3RvZ2dsZU9uSW50ZXJhY3Rpb24oKSB7XG5cbiAgICB0aGlzLnBsdWdpbi5zb3J0KHRoaXMpO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwicGJsLWJzLXNvcnRhYmxlXCJcbiAgICAgW2NsYXNzLnBibC1icy1zb3J0YWJsZS1hZnRlcl09XCJfaXNBZnRlcigpXCJcbiAgICAgW2NsYXNzLnBibC1icy1zb3J0YWJsZS1zb3J0ZWRdPVwiX2lzU29ydGVkKClcIlxuICAgICBbY2xhc3MucGJsLWJzLXNvcnRhYmxlLWRpc2FibGVkXT1cIl9pc0Rpc2FibGVkKClcIlxuICAgICBbY2xhc3MuYXNjXT1cIl9kaXJlY3Rpb24gPT09ICdhc2MnXCJcbiAgICAgW2NsYXNzLmRlc2NdPVwiX2RpcmVjdGlvbiA9PT0gJ2Rlc2MnXCJcbiAgICAgcm9sZT1cImJ1dHRvblwiPlxuXG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvZGl2PlxuIl19