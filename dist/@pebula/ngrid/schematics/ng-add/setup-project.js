"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const theming_1 = require("./theming/theming");
function ngAddSetupProject(options) {
    const { project } = options;
    return schematics_1.chain([
        ...options.externalSchematics.map(p => {
            switch (p) {
                case '@angular/cdk':
                    return schematics_1.externalSchematic('@angular/cdk', 'ng-add', { name: project });
                case '@ng-bootstrap/ng-bootstrap':
                    return schematics_1.externalSchematic('@ng-bootstrap/ng-bootstrap', 'ng-add', { project });
                case '@angular/material':
                    return schematics_1.externalSchematic('@angular/material', 'ng-add', { name: project });
                default:
                    throw new Error(`Invalid external schematic ${p}`);
            }
        }),
        theming_1.addThemeToAppStyles(options),
    ]);
}
exports.default = ngAddSetupProject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dXAtcHJvamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvbmdyaWQvc2NoZW1hdGljcy9uZy1hZGQvc2V0dXAtcHJvamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJEQUE0RTtBQUc1RSwrQ0FBd0Q7QUFFeEQsU0FBd0IsaUJBQWlCLENBQUMsT0FBb0I7SUFFNUQsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQztJQUM1QixPQUFPLGtCQUFLLENBQUM7UUFDWCxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUUsQ0FBQyxDQUFDLEVBQUU7WUFDckMsUUFBUSxDQUFDLEVBQUU7Z0JBQ1QsS0FBSyxjQUFjO29CQUNqQixPQUFPLDhCQUFpQixDQUFDLGNBQWMsRUFBRSxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQTtnQkFDdkUsS0FBSyw0QkFBNEI7b0JBQy9CLE9BQU8sOEJBQWlCLENBQUMsNEJBQTRCLEVBQUUsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQTtnQkFDL0UsS0FBSyxtQkFBbUI7b0JBQ3RCLE9BQU8sOEJBQWlCLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUE7Z0JBQzVFO29CQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDdEQ7UUFDSCxDQUFDLENBQUM7UUFDRiw2QkFBbUIsQ0FBQyxPQUFPLENBQUM7S0FDN0IsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWxCRCxvQ0FrQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjaGFpbiwgUnVsZSwgZXh0ZXJuYWxTY2hlbWF0aWMgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5cbmltcG9ydCB7IFNldHVwU2NoZW1hIH0gZnJvbSAnLi9zZXR1cC1zY2hlbWEnO1xuaW1wb3J0IHsgYWRkVGhlbWVUb0FwcFN0eWxlcyB9IGZyb20gJy4vdGhlbWluZy90aGVtaW5nJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbmdBZGRTZXR1cFByb2plY3Qob3B0aW9uczogU2V0dXBTY2hlbWEpOiBSdWxlIHtcblxuICBjb25zdCB7IHByb2plY3QgfSA9IG9wdGlvbnM7XG4gIHJldHVybiBjaGFpbihbXG4gICAgLi4ub3B0aW9ucy5leHRlcm5hbFNjaGVtYXRpY3MubWFwKCBwID0+IHtcbiAgICAgIHN3aXRjaCAocCkge1xuICAgICAgICBjYXNlICdAYW5ndWxhci9jZGsnOlxuICAgICAgICAgIHJldHVybiBleHRlcm5hbFNjaGVtYXRpYygnQGFuZ3VsYXIvY2RrJywgJ25nLWFkZCcsIHsgbmFtZTogcHJvamVjdCB9KVxuICAgICAgICBjYXNlICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc6XG4gICAgICAgICAgcmV0dXJuIGV4dGVybmFsU2NoZW1hdGljKCdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCcsICduZy1hZGQnLCB7IHByb2plY3QgfSlcbiAgICAgICAgY2FzZSAnQGFuZ3VsYXIvbWF0ZXJpYWwnOlxuICAgICAgICAgIHJldHVybiBleHRlcm5hbFNjaGVtYXRpYygnQGFuZ3VsYXIvbWF0ZXJpYWwnLCAnbmctYWRkJywgeyBuYW1lOiBwcm9qZWN0IH0pXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGV4dGVybmFsIHNjaGVtYXRpYyAke3B9YCk7XG4gICAgICB9XG4gICAgfSksXG4gICAgYWRkVGhlbWVUb0FwcFN0eWxlcyhvcHRpb25zKSxcbiAgXSk7XG59XG4iXX0=