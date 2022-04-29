import { Subject } from 'rxjs';
export class MetaRowsStore {
    constructor(differs) {
        this.differs = differs;
        this.visibleChanged$ = new Subject();
        this.hDiffers = [];
        this.fDiffers = [];
    }
    setHeader(value) {
        const index = value.rowDef.rowIndex;
        this.headers[index] = value;
        if (this.hDiffers[index]) {
            const diff = this.hDiffers[index].diff(value.keys);
            if (diff) {
                this.visibleChanged$.next({ metaRow: value, changes: diff });
            }
        }
        else {
            this.hDiffers[index] = this.differs.find([]).create();
            this.hDiffers[index].diff(value.keys);
        }
    }
    setFooter(value) {
        const index = value.rowDef.rowIndex;
        this.footers[index] = value;
        if (this.fDiffers[index]) {
            const diff = this.fDiffers[index].diff(value.keys);
            if (diff) {
                this.visibleChanged$.next({ metaRow: value, changes: diff });
            }
        }
        else {
            this.fDiffers[index] = this.differs.find([]).create();
            this.fDiffers[index].diff(value.keys);
        }
    }
    updateHeader(value) {
        this.setHeader(Object.assign(this.headers[value.rowDef.rowIndex] || {}, value));
    }
    updateFooter(value) {
        this.setFooter(Object.assign(this.footers[value.rowDef.rowIndex] || {}, value));
    }
    clear() {
        this.headers = [];
        this.footers = [];
    }
    dispose() {
        this.visibleChanged$.complete();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1yb3dzLXN0b3JlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3JpZC9zcmMvbGliL2dyaWQvY29sdW1uL21hbmFnZW1lbnQvbWV0YS1yb3dzLXN0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFTL0IsTUFBTSxPQUFPLGFBQWE7SUFTeEIsWUFBNkIsT0FBd0I7UUFBeEIsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFMNUMsb0JBQWUsR0FBRyxJQUFJLE9BQU8sRUFBZ0MsQ0FBQztRQUUvRCxhQUFRLEdBQTZCLEVBQUUsQ0FBQztRQUN4QyxhQUFRLEdBQTZCLEVBQUUsQ0FBQztJQUdoRCxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQXFEO1FBQzdELE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQzVCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN4QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkQsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2FBQzlEO1NBQ0Y7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFVLENBQUM7WUFDOUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQztJQUVELFNBQVMsQ0FBQyxLQUFxRDtRQUM3RCxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDeEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25ELElBQUksSUFBSSxFQUFFO2dCQUNSLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUM5RDtTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBVSxDQUFDO1lBQzlELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QztJQUNILENBQUM7SUFFRCxZQUFZLENBQUMsS0FBcUQ7UUFDaEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQXFEO1FBQ2hFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsT0FBTztRQUNMLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEMsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSXRlcmFibGVDaGFuZ2VzLCBJdGVyYWJsZURpZmZlciwgSXRlcmFibGVEaWZmZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYmxDb2x1bW5TdG9yZU1ldGFSb3cgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBQYmxNZXRhUm93Q29sdW1uc0NoYW5nZUV2ZW50IHtcbiAgbWV0YVJvdzogUGJsQ29sdW1uU3RvcmVNZXRhUm93O1xuICBjaGFuZ2VzOiBJdGVyYWJsZUNoYW5nZXM8c3RyaW5nPjtcbn1cblxuZXhwb3J0IGNsYXNzIE1ldGFSb3dzU3RvcmUge1xuICBoZWFkZXJzOiBBcnJheTxQYmxDb2x1bW5TdG9yZU1ldGFSb3cgJiB7IGFsbEtleXM/OiBzdHJpbmdbXSB9PjtcbiAgZm9vdGVyczogQXJyYXk8UGJsQ29sdW1uU3RvcmVNZXRhUm93ICYgeyBhbGxLZXlzPzogc3RyaW5nW10gfT47XG5cbiAgcmVhZG9ubHkgdmlzaWJsZUNoYW5nZWQkID0gbmV3IFN1YmplY3Q8UGJsTWV0YVJvd0NvbHVtbnNDaGFuZ2VFdmVudD4oKTtcblxuICBwcml2YXRlIGhEaWZmZXJzOiBJdGVyYWJsZURpZmZlcjxzdHJpbmc+W10gPSBbXTtcbiAgcHJpdmF0ZSBmRGlmZmVyczogSXRlcmFibGVEaWZmZXI8c3RyaW5nPltdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBkaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMpIHtcbiAgfVxuXG4gIHNldEhlYWRlcih2YWx1ZTogUGJsQ29sdW1uU3RvcmVNZXRhUm93ICYgeyBhbGxLZXlzPzogc3RyaW5nW10gfSkge1xuICAgIGNvbnN0IGluZGV4ID0gdmFsdWUucm93RGVmLnJvd0luZGV4O1xuICAgIHRoaXMuaGVhZGVyc1tpbmRleF0gPSB2YWx1ZTtcbiAgICBpZiAodGhpcy5oRGlmZmVyc1tpbmRleF0pIHtcbiAgICAgIGNvbnN0IGRpZmYgPSB0aGlzLmhEaWZmZXJzW2luZGV4XS5kaWZmKHZhbHVlLmtleXMpO1xuICAgICAgaWYgKGRpZmYpIHtcbiAgICAgICAgdGhpcy52aXNpYmxlQ2hhbmdlZCQubmV4dCh7IG1ldGFSb3c6IHZhbHVlLCBjaGFuZ2VzOiBkaWZmIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhEaWZmZXJzW2luZGV4XSA9IHRoaXMuZGlmZmVycy5maW5kKFtdKS5jcmVhdGU8c3RyaW5nPigpO1xuICAgICAgdGhpcy5oRGlmZmVyc1tpbmRleF0uZGlmZih2YWx1ZS5rZXlzKTtcbiAgICB9XG4gIH1cblxuICBzZXRGb290ZXIodmFsdWU6IFBibENvbHVtblN0b3JlTWV0YVJvdyAmIHsgYWxsS2V5cz86IHN0cmluZ1tdIH0pIHtcbiAgICBjb25zdCBpbmRleCA9IHZhbHVlLnJvd0RlZi5yb3dJbmRleDtcbiAgICB0aGlzLmZvb3RlcnNbaW5kZXhdID0gdmFsdWU7XG4gICAgaWYgKHRoaXMuZkRpZmZlcnNbaW5kZXhdKSB7XG4gICAgICBjb25zdCBkaWZmID0gdGhpcy5mRGlmZmVyc1tpbmRleF0uZGlmZih2YWx1ZS5rZXlzKTtcbiAgICAgIGlmIChkaWZmKSB7XG4gICAgICAgIHRoaXMudmlzaWJsZUNoYW5nZWQkLm5leHQoeyBtZXRhUm93OiB2YWx1ZSwgY2hhbmdlczogZGlmZiB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mRGlmZmVyc1tpbmRleF0gPSB0aGlzLmRpZmZlcnMuZmluZChbXSkuY3JlYXRlPHN0cmluZz4oKTtcbiAgICAgIHRoaXMuZkRpZmZlcnNbaW5kZXhdLmRpZmYodmFsdWUua2V5cyk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlSGVhZGVyKHZhbHVlOiBQYmxDb2x1bW5TdG9yZU1ldGFSb3cgJiB7IGFsbEtleXM/OiBzdHJpbmdbXSB9KTogdm9pZCB7XG4gICAgdGhpcy5zZXRIZWFkZXIoT2JqZWN0LmFzc2lnbih0aGlzLmhlYWRlcnNbdmFsdWUucm93RGVmLnJvd0luZGV4XSB8fCB7fSwgdmFsdWUpKTtcbiAgfVxuXG4gIHVwZGF0ZUZvb3Rlcih2YWx1ZTogUGJsQ29sdW1uU3RvcmVNZXRhUm93ICYgeyBhbGxLZXlzPzogc3RyaW5nW10gfSk6IHZvaWQge1xuICAgIHRoaXMuc2V0Rm9vdGVyKE9iamVjdC5hc3NpZ24odGhpcy5mb290ZXJzW3ZhbHVlLnJvd0RlZi5yb3dJbmRleF0gfHwge30sIHZhbHVlKSk7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLmhlYWRlcnMgPSBbXTtcbiAgICB0aGlzLmZvb3RlcnMgPSBbXTtcbiAgfVxuXG4gIGRpc3Bvc2UoKSB7XG4gICAgdGhpcy52aXNpYmxlQ2hhbmdlZCQuY29tcGxldGUoKTtcbiAgfVxufVxuIl19