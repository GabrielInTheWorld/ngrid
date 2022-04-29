"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const workspace_1 = require("@schematics/angular/utility/workspace");
const workspace_models_1 = require("@schematics/angular/utility/workspace-models");
const meta = require("./metadata");
const messages = require("./messages");
const package_config_1 = require("../utils/package-config");
function getNgridPackageName(packageName) {
    return `@pebula/${packageName}`;
}
function ngAdd(options) {
    return (tree, context) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const workspace = yield workspace_1.getWorkspace(tree);
        const project = options.project || workspace.extensions.defaultProject;
        const uiPlugin = options.uiPlugin || 'none';
        const theme = options.theme || 'light';
        const projectWorkspace = workspace.projects.get(project);
        if (!projectWorkspace) {
            throw new schematics_1.SchematicsException(messages.noProject(project));
        }
        const setupSchema = {
            project,
            uiPlugin,
            theme,
            externalSchematics: [],
        };
        // Installing dependencies
        const angularCdkVersion = package_config_1.getPackageVersionFromPackageJson(tree, '@angular/cdk');
        if (angularCdkVersion === null) {
            package_config_1.addPackageToPackageJson(tree, '@angular/cdk', meta.NG_MATERIAL_VERSION);
            setupSchema.externalSchematics.push('@angular/cdk');
        }
        package_config_1.addPackageToPackageJson(tree, getNgridPackageName('ngrid'), `^${meta.NGRID_VERSION}`);
        switch (uiPlugin) {
            case 'bootstrap':
                const ngBootstrapVersion = package_config_1.getPackageVersionFromPackageJson(tree, '@ng-bootstrap/ng-bootstrap');
                if (ngBootstrapVersion === null) {
                    package_config_1.addPackageToPackageJson(tree, '@ng-bootstrap/ng-bootstrap', meta.NG_BOOTSTRAP_VERSION);
                    setupSchema.externalSchematics.push('@ng-bootstrap/ng-bootstrap');
                }
                package_config_1.addPackageToPackageJson(tree, getNgridPackageName('ngrid-bootstrap'), `^${meta.NGRID_VERSION}`);
                break;
            case 'material':
                const ngMaterialVersion = package_config_1.getPackageVersionFromPackageJson(tree, '@angular/material');
                if (ngMaterialVersion === null) {
                    package_config_1.addPackageToPackageJson(tree, '@angular/material', meta.NG_MATERIAL_VERSION);
                    setupSchema.externalSchematics.push('@angular/material');
                }
                package_config_1.addPackageToPackageJson(tree, getNgridPackageName('ngrid-material'), `^${meta.NGRID_VERSION}`);
                break;
        }
        const installTaskId = context.addTask(new tasks_1.NodePackageInstallTask());
        if (projectWorkspace.extensions.projectType === workspace_models_1.ProjectType.Application) {
            context.addTask(new tasks_1.RunSchematicTask('ng-add-setup-project', setupSchema), [installTaskId]);
        }
    });
}
exports.default = ngAdd;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL25ncmlkL3NjaGVtYXRpY3MvbmctYWRkL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJEQUErRjtBQUMvRiw0REFBNEY7QUFDNUYscUVBQXFFO0FBQ3JFLG1GQUEyRTtBQUUzRSxtQ0FBbUM7QUFHbkMsdUNBQXVDO0FBQ3ZDLDREQUFvRztBQUVwRyxTQUFTLG1CQUFtQixDQUFDLFdBQW1CO0lBQzlDLE9BQU8sV0FBVyxXQUFXLEVBQUUsQ0FBQztBQUNsQyxDQUFDO0FBRUQsU0FBd0IsS0FBSyxDQUFDLE9BQWU7SUFDM0MsT0FBTyxDQUFNLElBQVUsRUFBRSxPQUF5QixFQUFFLEVBQUU7UUFDcEQsTUFBTSxTQUFTLEdBQUcsTUFBTSx3QkFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxjQUF3QixDQUFDO1FBQ2pGLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDO1FBQzVDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDO1FBRXZDLE1BQU0sZ0JBQWdCLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFekQsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3JCLE1BQU0sSUFBSSxnQ0FBbUIsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDNUQ7UUFFRCxNQUFNLFdBQVcsR0FBZ0I7WUFDL0IsT0FBTztZQUNQLFFBQVE7WUFDUixLQUFLO1lBQ0wsa0JBQWtCLEVBQUUsRUFBRTtTQUN2QixDQUFDO1FBRUYsMEJBQTBCO1FBQzFCLE1BQU0saUJBQWlCLEdBQUcsaURBQWdDLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBRWpGLElBQUksaUJBQWlCLEtBQUssSUFBSSxFQUFFO1lBQzlCLHdDQUF1QixDQUFDLElBQUksRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDeEUsV0FBVyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUNyRDtRQUVELHdDQUF1QixDQUFDLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBRXRGLFFBQVEsUUFBUSxFQUFFO1lBQ2hCLEtBQUssV0FBVztnQkFDZCxNQUFNLGtCQUFrQixHQUFHLGlEQUFnQyxDQUFDLElBQUksRUFBRSw0QkFBNEIsQ0FBQyxDQUFDO2dCQUNoRyxJQUFJLGtCQUFrQixLQUFLLElBQUksRUFBRTtvQkFDL0Isd0NBQXVCLENBQUMsSUFBSSxFQUFFLDRCQUE0QixFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO29CQUN2RixXQUFXLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7aUJBQ25FO2dCQUNELHdDQUF1QixDQUFDLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7Z0JBQ2hHLE1BQU07WUFDUixLQUFLLFVBQVU7Z0JBQ2IsTUFBTSxpQkFBaUIsR0FBRyxpREFBZ0MsQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztnQkFDdEYsSUFBSSxpQkFBaUIsS0FBSyxJQUFJLEVBQUU7b0JBQzlCLHdDQUF1QixDQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztvQkFDN0UsV0FBVyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2lCQUMxRDtnQkFDRCx3Q0FBdUIsQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO2dCQUMvRixNQUFNO1NBQ1Q7UUFFRCxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksOEJBQXNCLEVBQUUsQ0FBQyxDQUFDO1FBRXBFLElBQUksZ0JBQWdCLENBQUMsVUFBVSxDQUFDLFdBQVcsS0FBSyw4QkFBVyxDQUFDLFdBQVcsRUFBRTtZQUN2RSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksd0JBQWdCLENBQUMsc0JBQXNCLEVBQUUsV0FBVyxDQUFDLEVBQUUsQ0FBRSxhQUFhLENBQUUsQ0FBQyxDQUFDO1NBQy9GO0lBQ0gsQ0FBQyxDQUFBLENBQUM7QUFDSixDQUFDO0FBdkRELHdCQXVEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJ1bGUsIFNjaGVtYXRpY0NvbnRleHQsIFNjaGVtYXRpY3NFeGNlcHRpb24sIFRyZWUgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQgeyBOb2RlUGFja2FnZUluc3RhbGxUYXNrLCBSdW5TY2hlbWF0aWNUYXNrIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MvdGFza3MnO1xuaW1wb3J0IHsgZ2V0V29ya3NwYWNlIH0gZnJvbSAnQHNjaGVtYXRpY3MvYW5ndWxhci91dGlsaXR5L3dvcmtzcGFjZSc7XG5pbXBvcnQgeyBQcm9qZWN0VHlwZSB9IGZyb20gJ0BzY2hlbWF0aWNzL2FuZ3VsYXIvdXRpbGl0eS93b3Jrc3BhY2UtbW9kZWxzJztcblxuaW1wb3J0ICogYXMgbWV0YSBmcm9tICcuL21ldGFkYXRhJztcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gJy4vc2NoZW1hJztcbmltcG9ydCB7IFNldHVwU2NoZW1hIH0gZnJvbSAnLi9zZXR1cC1zY2hlbWEnO1xuaW1wb3J0ICogYXMgbWVzc2FnZXMgZnJvbSAnLi9tZXNzYWdlcyc7XG5pbXBvcnQgeyBhZGRQYWNrYWdlVG9QYWNrYWdlSnNvbiwgZ2V0UGFja2FnZVZlcnNpb25Gcm9tUGFja2FnZUpzb24gfSBmcm9tICcuLi91dGlscy9wYWNrYWdlLWNvbmZpZyc7XG5cbmZ1bmN0aW9uIGdldE5ncmlkUGFja2FnZU5hbWUocGFja2FnZU5hbWU6IHN0cmluZykge1xuICByZXR1cm4gYEBwZWJ1bGEvJHtwYWNrYWdlTmFtZX1gO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBuZ0FkZChvcHRpb25zOiBTY2hlbWEpOiBSdWxlIHtcbiAgcmV0dXJuIGFzeW5jKHRyZWU6IFRyZWUsIGNvbnRleHQ6IFNjaGVtYXRpY0NvbnRleHQpID0+IHtcbiAgICBjb25zdCB3b3Jrc3BhY2UgPSBhd2FpdCBnZXRXb3Jrc3BhY2UodHJlZSk7XG4gICAgY29uc3QgcHJvamVjdCA9IG9wdGlvbnMucHJvamVjdCB8fCB3b3Jrc3BhY2UuZXh0ZW5zaW9ucy5kZWZhdWx0UHJvamVjdCBhcyBzdHJpbmc7XG4gICAgY29uc3QgdWlQbHVnaW4gPSBvcHRpb25zLnVpUGx1Z2luIHx8ICdub25lJztcbiAgICBjb25zdCB0aGVtZSA9IG9wdGlvbnMudGhlbWUgfHwgJ2xpZ2h0JztcblxuICAgIGNvbnN0IHByb2plY3RXb3Jrc3BhY2UgPSB3b3Jrc3BhY2UucHJvamVjdHMuZ2V0KHByb2plY3QpO1xuXG4gICAgaWYgKCFwcm9qZWN0V29ya3NwYWNlKSB7XG4gICAgICB0aHJvdyBuZXcgU2NoZW1hdGljc0V4Y2VwdGlvbihtZXNzYWdlcy5ub1Byb2plY3QocHJvamVjdCkpO1xuICAgIH1cblxuICAgIGNvbnN0IHNldHVwU2NoZW1hOiBTZXR1cFNjaGVtYSA9IHtcbiAgICAgIHByb2plY3QsXG4gICAgICB1aVBsdWdpbixcbiAgICAgIHRoZW1lLFxuICAgICAgZXh0ZXJuYWxTY2hlbWF0aWNzOiBbXSxcbiAgICB9O1xuXG4gICAgLy8gSW5zdGFsbGluZyBkZXBlbmRlbmNpZXNcbiAgICBjb25zdCBhbmd1bGFyQ2RrVmVyc2lvbiA9IGdldFBhY2thZ2VWZXJzaW9uRnJvbVBhY2thZ2VKc29uKHRyZWUsICdAYW5ndWxhci9jZGsnKTtcblxuICAgIGlmIChhbmd1bGFyQ2RrVmVyc2lvbiA9PT0gbnVsbCkge1xuICAgICAgYWRkUGFja2FnZVRvUGFja2FnZUpzb24odHJlZSwgJ0Bhbmd1bGFyL2NkaycsIG1ldGEuTkdfTUFURVJJQUxfVkVSU0lPTik7XG4gICAgICBzZXR1cFNjaGVtYS5leHRlcm5hbFNjaGVtYXRpY3MucHVzaCgnQGFuZ3VsYXIvY2RrJyk7XG4gICAgfVxuXG4gICAgYWRkUGFja2FnZVRvUGFja2FnZUpzb24odHJlZSwgZ2V0TmdyaWRQYWNrYWdlTmFtZSgnbmdyaWQnKSwgYF4ke21ldGEuTkdSSURfVkVSU0lPTn1gKTtcblxuICAgIHN3aXRjaCAodWlQbHVnaW4pIHtcbiAgICAgIGNhc2UgJ2Jvb3RzdHJhcCc6XG4gICAgICAgIGNvbnN0IG5nQm9vdHN0cmFwVmVyc2lvbiA9IGdldFBhY2thZ2VWZXJzaW9uRnJvbVBhY2thZ2VKc29uKHRyZWUsICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCcpO1xuICAgICAgICBpZiAobmdCb290c3RyYXBWZXJzaW9uID09PSBudWxsKSB7XG4gICAgICAgICAgYWRkUGFja2FnZVRvUGFja2FnZUpzb24odHJlZSwgJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJywgbWV0YS5OR19CT09UU1RSQVBfVkVSU0lPTik7XG4gICAgICAgICAgc2V0dXBTY2hlbWEuZXh0ZXJuYWxTY2hlbWF0aWNzLnB1c2goJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJyk7XG4gICAgICAgIH1cbiAgICAgICAgYWRkUGFja2FnZVRvUGFja2FnZUpzb24odHJlZSwgZ2V0TmdyaWRQYWNrYWdlTmFtZSgnbmdyaWQtYm9vdHN0cmFwJyksIGBeJHttZXRhLk5HUklEX1ZFUlNJT059YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbWF0ZXJpYWwnOlxuICAgICAgICBjb25zdCBuZ01hdGVyaWFsVmVyc2lvbiA9IGdldFBhY2thZ2VWZXJzaW9uRnJvbVBhY2thZ2VKc29uKHRyZWUsICdAYW5ndWxhci9tYXRlcmlhbCcpO1xuICAgICAgICBpZiAobmdNYXRlcmlhbFZlcnNpb24gPT09IG51bGwpIHtcbiAgICAgICAgICBhZGRQYWNrYWdlVG9QYWNrYWdlSnNvbih0cmVlLCAnQGFuZ3VsYXIvbWF0ZXJpYWwnLCBtZXRhLk5HX01BVEVSSUFMX1ZFUlNJT04pO1xuICAgICAgICAgIHNldHVwU2NoZW1hLmV4dGVybmFsU2NoZW1hdGljcy5wdXNoKCdAYW5ndWxhci9tYXRlcmlhbCcpO1xuICAgICAgICB9XG4gICAgICAgIGFkZFBhY2thZ2VUb1BhY2thZ2VKc29uKHRyZWUsIGdldE5ncmlkUGFja2FnZU5hbWUoJ25ncmlkLW1hdGVyaWFsJyksIGBeJHttZXRhLk5HUklEX1ZFUlNJT059YCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnN0IGluc3RhbGxUYXNrSWQgPSBjb250ZXh0LmFkZFRhc2sobmV3IE5vZGVQYWNrYWdlSW5zdGFsbFRhc2soKSk7XG5cbiAgICBpZiAocHJvamVjdFdvcmtzcGFjZS5leHRlbnNpb25zLnByb2plY3RUeXBlID09PSBQcm9qZWN0VHlwZS5BcHBsaWNhdGlvbikge1xuICAgICAgY29udGV4dC5hZGRUYXNrKG5ldyBSdW5TY2hlbWF0aWNUYXNrKCduZy1hZGQtc2V0dXAtcHJvamVjdCcsIHNldHVwU2NoZW1hKSwgWyBpbnN0YWxsVGFza0lkIF0pO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==