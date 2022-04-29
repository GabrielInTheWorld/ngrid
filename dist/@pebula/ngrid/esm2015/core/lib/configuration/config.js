import { ReplaySubject } from 'rxjs';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import * as i0 from "@angular/core";
const DEFAULT_TABLE_CONFIG = {
    showHeader: true,
    showFooter: false,
    noFiller: false,
    clearContextOnSourceChanging: false,
};
export const PEB_NGRID_CONFIG = new InjectionToken('PEB_NGRID_CONFIG');
export class PblNgridConfigService {
    constructor(_config) {
        this.config = new Map();
        this.configNotify = new Map();
        if (_config) {
            for (const key of Object.keys(_config)) {
                this.config.set(key, _config[key]);
            }
        }
        const gridConfig = this.config.get('table') || {};
        this.config.set('table', Object.assign(Object.assign({}, DEFAULT_TABLE_CONFIG), gridConfig));
    }
    has(section) {
        return this.config.has(section);
    }
    get(section, fallback) {
        return this.config.get(section) || fallback;
    }
    set(section, value) {
        const prev = this.get(section);
        value = Object.assign({}, value);
        Object.freeze(value);
        this.config.set(section, value);
        this.notify(section, value, prev);
    }
    onUpdate(section) {
        return this.getGetNotifier(section);
    }
    getGetNotifier(section) {
        let notifier = this.configNotify.get(section);
        if (!notifier) {
            this.configNotify.set(section, notifier = new ReplaySubject(1));
        }
        return notifier;
    }
    notify(section, curr, prev) {
        this.getGetNotifier(section).next({ curr, prev });
    }
}
/** @nocollapse */ PblNgridConfigService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridConfigService, deps: [{ token: PEB_NGRID_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ PblNgridConfigService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridConfigService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridConfigService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [PEB_NGRID_CONFIG]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3JpZC9jb3JlL3NyYy9saWIvY29uZmlndXJhdGlvbi9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFjLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUc3RSxNQUFNLG9CQUFvQixHQUE0QjtJQUNwRCxVQUFVLEVBQUUsSUFBSTtJQUNoQixVQUFVLEVBQUUsS0FBSztJQUNqQixRQUFRLEVBQUUsS0FBSztJQUNmLDRCQUE0QixFQUFFLEtBQUs7Q0FDcEMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHLElBQUksY0FBYyxDQUFpQixrQkFBa0IsQ0FBQyxDQUFDO0FBR3ZGLE1BQU0sT0FBTyxxQkFBcUI7SUFLaEMsWUFBa0QsT0FBdUI7UUFIakUsV0FBTSxHQUFHLElBQUksR0FBRyxFQUE2QixDQUFDO1FBQzlDLGlCQUFZLEdBQUcsSUFBSSxHQUFHLEVBQTRDLENBQUM7UUFHekUsSUFBSSxPQUFPLEVBQUU7WUFDWCxLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3JDLElBQUksQ0FBQyxNQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUM3QztTQUNGO1FBRUQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sa0NBQ2xCLG9CQUFvQixHQUNwQixVQUFVLEVBQ2IsQ0FBQztJQUNMLENBQUM7SUFFRCxHQUFHLENBQUMsT0FBNkI7UUFDL0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsR0FBRyxDQUFpQyxPQUFVLEVBQUUsUUFBcUM7UUFDbkYsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxRQUFRLENBQUM7SUFDOUMsQ0FBQztJQUVELEdBQUcsQ0FBaUMsT0FBVSxFQUFFLEtBQXdCO1FBQ3RFLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0IsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsUUFBUSxDQUFpQyxPQUFVO1FBQ2pELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRU8sY0FBYyxDQUFpQyxPQUFVO1FBQy9ELElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDYixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxHQUFHLElBQUksYUFBYSxDQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEU7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRU8sTUFBTSxDQUFpQyxPQUFVLEVBQUUsSUFBdUIsRUFBRSxJQUF1QjtRQUN6RyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7O3FJQWpEVSxxQkFBcUIsa0JBS0EsZ0JBQWdCO3lJQUxyQyxxQkFBcUIsY0FEUixNQUFNOzJGQUNuQixxQkFBcUI7a0JBRGpDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzswQkFNbkIsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb25maWcgfSBmcm9tICcuL3R5cGUnO1xuXG5jb25zdCBERUZBVUxUX1RBQkxFX0NPTkZJRzogUGJsTmdyaWRDb25maWdbJ3RhYmxlJ10gPSB7XG4gIHNob3dIZWFkZXI6IHRydWUsXG4gIHNob3dGb290ZXI6IGZhbHNlLFxuICBub0ZpbGxlcjogZmFsc2UsXG4gIGNsZWFyQ29udGV4dE9uU291cmNlQ2hhbmdpbmc6IGZhbHNlLFxufTtcblxuZXhwb3J0IGNvbnN0IFBFQl9OR1JJRF9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48UGJsTmdyaWRDb25maWc+KCdQRUJfTkdSSURfQ09ORklHJyk7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDb25maWdTZXJ2aWNlIHtcblxuICBwcml2YXRlIGNvbmZpZyA9IG5ldyBNYXA8a2V5b2YgUGJsTmdyaWRDb25maWcsIGFueT4oKTtcbiAgcHJpdmF0ZSBjb25maWdOb3RpZnkgPSBuZXcgTWFwPGtleW9mIFBibE5ncmlkQ29uZmlnLCBSZXBsYXlTdWJqZWN0PGFueT4+KCk7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdChQRUJfTkdSSURfQ09ORklHKSBfY29uZmlnOiBQYmxOZ3JpZENvbmZpZykge1xuICAgIGlmIChfY29uZmlnKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhfY29uZmlnKSkge1xuICAgICAgICAodGhpcy5jb25maWcgYXMgYW55KS5zZXQoa2V5LCBfY29uZmlnW2tleV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGdyaWRDb25maWcgPSB0aGlzLmNvbmZpZy5nZXQoJ3RhYmxlJykgfHwge307XG4gICAgdGhpcy5jb25maWcuc2V0KCd0YWJsZScsIHtcbiAgICAgIC4uLkRFRkFVTFRfVEFCTEVfQ09ORklHLFxuICAgICAgLi4uZ3JpZENvbmZpZyxcbiAgICB9KTtcbiAgfVxuXG4gIGhhcyhzZWN0aW9uOiBrZXlvZiBQYmxOZ3JpZENvbmZpZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5oYXMoc2VjdGlvbik7XG4gIH1cblxuICBnZXQ8VCBleHRlbmRzIGtleW9mIFBibE5ncmlkQ29uZmlnPihzZWN0aW9uOiBULCBmYWxsYmFjaz86IFBhcnRpYWw8UGJsTmdyaWRDb25maWdbVF0+KTogUGJsTmdyaWRDb25maWdbVF0gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5nZXQoc2VjdGlvbikgfHwgZmFsbGJhY2s7XG4gIH1cblxuICBzZXQ8VCBleHRlbmRzIGtleW9mIFBibE5ncmlkQ29uZmlnPihzZWN0aW9uOiBULCB2YWx1ZTogUGJsTmdyaWRDb25maWdbVF0pOiB2b2lkIHtcbiAgICBjb25zdCBwcmV2ID0gdGhpcy5nZXQoc2VjdGlvbik7XG4gICAgdmFsdWUgPSBPYmplY3QuYXNzaWduKHt9LCB2YWx1ZSk7XG4gICAgT2JqZWN0LmZyZWV6ZSh2YWx1ZSk7XG4gICAgdGhpcy5jb25maWcuc2V0KHNlY3Rpb24sIHZhbHVlKTtcbiAgICB0aGlzLm5vdGlmeShzZWN0aW9uLCB2YWx1ZSwgcHJldik7XG4gIH1cblxuICBvblVwZGF0ZTxUIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRDb25maWc+KHNlY3Rpb246IFQpOiBPYnNlcnZhYmxlPHsgY3VycjogUGJsTmdyaWRDb25maWdbVF07IHByZXY6IFBibE5ncmlkQ29uZmlnW1RdIHwgdW5kZWZpbmVkOyB9PiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0R2V0Tm90aWZpZXIoc2VjdGlvbik7XG4gIH1cblxuICBwcml2YXRlIGdldEdldE5vdGlmaWVyPFQgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZENvbmZpZz4oc2VjdGlvbjogVCk6IFJlcGxheVN1YmplY3Q8YW55PiB7XG4gICAgbGV0IG5vdGlmaWVyID0gdGhpcy5jb25maWdOb3RpZnkuZ2V0KHNlY3Rpb24pO1xuICAgIGlmICghbm90aWZpZXIpIHtcbiAgICAgIHRoaXMuY29uZmlnTm90aWZ5LnNldChzZWN0aW9uLCBub3RpZmllciA9IG5ldyBSZXBsYXlTdWJqZWN0PGFueT4oMSkpO1xuICAgIH1cbiAgICByZXR1cm4gbm90aWZpZXI7XG4gIH1cblxuICBwcml2YXRlIG5vdGlmeTxUIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRDb25maWc+KHNlY3Rpb246IFQsIGN1cnI6IFBibE5ncmlkQ29uZmlnW1RdLCBwcmV2OiBQYmxOZ3JpZENvbmZpZ1tUXSk6IHZvaWQge1xuICAgIHRoaXMuZ2V0R2V0Tm90aWZpZXIoc2VjdGlvbikubmV4dCh7IGN1cnIsIHByZXYgfSk7XG4gIH1cbn1cbiJdfQ==