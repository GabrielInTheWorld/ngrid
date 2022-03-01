import { PblNgridMultiComponentRegistry } from '@pebula/ngrid';
import { PblNgridMatHeaderContextMenuPlugin } from './header-context-menu.directive';
import { MatHeaderContextMenuTrigger } from './header-context-menu-trigger';
export class MatHeaderContextMenuExtension extends PblNgridMultiComponentRegistry {
    constructor(cfr) {
        super();
        this.cfr = cfr;
        this.name = 'matHeaderContextMenuTrigger';
        this.kind = 'dataHeaderExtensions';
        this.projectContent = false;
    }
    shouldRender(context) {
        return !!context.injector.get(PblNgridMatHeaderContextMenuPlugin, false);
    }
    getFactory(context) {
        return this.cfr.resolveComponentFactory(MatHeaderContextMenuTrigger);
    }
    onCreated(context, cmpRef) {
        cmpRef.instance.context = context;
        cmpRef.changeDetectorRef.markForCheck();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWNvbnRleHQtbWVudS1leHRlbnNpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25ncmlkLW1hdGVyaWFsL2NvbnRleHQtbWVudS9zcmMvbGliL2hlYWRlci1jb250ZXh0L2hlYWRlci1jb250ZXh0LW1lbnUtZXh0ZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSw4QkFBOEIsRUFBc0MsTUFBTSxlQUFlLENBQUM7QUFFbkcsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDckYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFNUUsTUFBTSxPQUFPLDZCQUE4QixTQUFRLDhCQUFtRjtJQUtwSSxZQUFvQixHQUE2QjtRQUFJLEtBQUssRUFBRSxDQUFDO1FBQXpDLFFBQUcsR0FBSCxHQUFHLENBQTBCO1FBSnhDLFNBQUksR0FBa0MsNkJBQTZCLENBQUM7UUFDcEUsU0FBSSxHQUEyQixzQkFBc0IsQ0FBQztRQUN0RCxtQkFBYyxHQUFHLEtBQUssQ0FBQztJQUU4QixDQUFDO0lBRS9ELFlBQVksQ0FBQyxPQUEyQztRQUN0RCxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQsVUFBVSxDQUFDLE9BQTJDO1FBQ3BELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCxTQUFTLENBQUMsT0FBMkMsRUFBRSxNQUFpRDtRQUN0RyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDbEMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFDLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudEZhY3RvcnksIENvbXBvbmVudFJlZiwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZE11bHRpQ29tcG9uZW50UmVnaXN0cnksIFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQgfSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuaW1wb3J0IHsgUGJsTmdyaWRNYXRIZWFkZXJDb250ZXh0TWVudVBsdWdpbiB9IGZyb20gJy4vaGVhZGVyLWNvbnRleHQtbWVudS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWF0SGVhZGVyQ29udGV4dE1lbnVUcmlnZ2VyIH0gZnJvbSAnLi9oZWFkZXItY29udGV4dC1tZW51LXRyaWdnZXInO1xuXG5leHBvcnQgY2xhc3MgTWF0SGVhZGVyQ29udGV4dE1lbnVFeHRlbnNpb24gZXh0ZW5kcyBQYmxOZ3JpZE11bHRpQ29tcG9uZW50UmVnaXN0cnk8TWF0SGVhZGVyQ29udGV4dE1lbnVUcmlnZ2VyLCAnZGF0YUhlYWRlckV4dGVuc2lvbnMnPiB7XG4gIHJlYWRvbmx5IG5hbWU6ICdtYXRIZWFkZXJDb250ZXh0TWVudVRyaWdnZXInID0gJ21hdEhlYWRlckNvbnRleHRNZW51VHJpZ2dlcic7XG4gIHJlYWRvbmx5IGtpbmQ6ICdkYXRhSGVhZGVyRXh0ZW5zaW9ucycgPSAnZGF0YUhlYWRlckV4dGVuc2lvbnMnO1xuICByZWFkb25seSBwcm9qZWN0Q29udGVudCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHsgc3VwZXIoKTsgfVxuXG4gIHNob3VsZFJlbmRlcihjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhY29udGV4dC5pbmplY3Rvci5nZXQoUGJsTmdyaWRNYXRIZWFkZXJDb250ZXh0TWVudVBsdWdpbiwgZmFsc2UpO1xuICB9XG5cbiAgZ2V0RmFjdG9yeShjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0KTogQ29tcG9uZW50RmFjdG9yeTxNYXRIZWFkZXJDb250ZXh0TWVudVRyaWdnZXI+IHtcbiAgICByZXR1cm4gdGhpcy5jZnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoTWF0SGVhZGVyQ29udGV4dE1lbnVUcmlnZ2VyKTtcbiAgfVxuXG4gIG9uQ3JlYXRlZChjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0LCBjbXBSZWY6IENvbXBvbmVudFJlZjxNYXRIZWFkZXJDb250ZXh0TWVudVRyaWdnZXI+KTogdm9pZCB7XG4gICAgY21wUmVmLmluc3RhbmNlLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIGNtcFJlZi5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufVxuIl19