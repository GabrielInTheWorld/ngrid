import { createStateChunkHandler } from '../../handling';
import { stateVisor } from '../../state-visor';
export function registerGridHandlers() {
    stateVisor.registerRootChunkSection('grid', {
        sourceMatcher: ctx => ctx.grid,
        stateMatcher: state => state.grid || (state.grid = {})
    });
    createStateChunkHandler('grid')
        .handleKeys('showHeader', 'showFooter', 'focusMode', 'usePagination', 'minDataViewHeight')
        .serialize((key, ctx) => {
        switch (key) {
            default:
                return ctx.source[key];
        }
    })
        .deserialize((key, stateValue, ctx) => {
        // We must assert the type starting from 3.5 onwards
        // See "Fixes to unsound writes to indexed access types" in https://devblogs.microsoft.com/typescript/announcing-typescript-3-5
        ctx.source[key] = stateValue;
    })
        .register();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25ncmlkL3N0YXRlL3NyYy9saWIvY29yZS9idWlsdC1pbi1oYW5kbGVycy9ncmlkLXByaW1pdGl2ZXMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBUy9DLE1BQU0sVUFBVSxvQkFBb0I7SUFDbEMsVUFBVSxDQUFDLHdCQUF3QixDQUNqQyxNQUFNLEVBQ047UUFDRSxhQUFhLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSTtRQUM5QixZQUFZLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFTLENBQUM7S0FDOUQsQ0FDRixDQUFDO0lBRUYsdUJBQXVCLENBQUMsTUFBTSxDQUFDO1NBQzVCLFVBQVUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsbUJBQW1CLENBQUM7U0FDekYsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ3RCLFFBQVEsR0FBRyxFQUFFO1lBQ1g7Z0JBQ0UsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQyxDQUFDO1NBQ0QsV0FBVyxDQUFFLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUNyQyxvREFBb0Q7UUFDcEQsK0hBQStIO1FBQy9ILEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBVSxDQUFDLEdBQUcsVUFBVSxDQUFDO0lBQ3RDLENBQUMsQ0FBQztTQUNELFFBQVEsRUFBRSxDQUFDO0FBQ2hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGlja1BOUCB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IGNyZWF0ZVN0YXRlQ2h1bmtIYW5kbGVyIH0gZnJvbSAnLi4vLi4vaGFuZGxpbmcnO1xuaW1wb3J0IHsgc3RhdGVWaXNvciB9IGZyb20gJy4uLy4uL3N0YXRlLXZpc29yJztcblxuZXhwb3J0IGludGVyZmFjZSBQYmxOZ3JpZFN1cmZhY2VTdGF0ZSBleHRlbmRzXG4gIFBpY2tQTlAgPFxuICAgIFBibE5ncmlkQ29tcG9uZW50LFxuICAgICdzaG93SGVhZGVyJyB8ICdzaG93Rm9vdGVyJyB8ICdmb2N1c01vZGUnIHwgJ3VzZVBhZ2luYXRpb24nIHwgJ21pbkRhdGFWaWV3SGVpZ2h0JyxcbiAgICBuZXZlclxuICA+IHsgfVxuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJHcmlkSGFuZGxlcnMoKSB7XG4gIHN0YXRlVmlzb3IucmVnaXN0ZXJSb290Q2h1bmtTZWN0aW9uKFxuICAgICdncmlkJyxcbiAgICB7XG4gICAgICBzb3VyY2VNYXRjaGVyOiBjdHggPT4gY3R4LmdyaWQsXG4gICAgICBzdGF0ZU1hdGNoZXI6IHN0YXRlID0+IHN0YXRlLmdyaWQgfHwgKHN0YXRlLmdyaWQgPSB7fSBhcyBhbnkpXG4gICAgfVxuICApO1xuXG4gIGNyZWF0ZVN0YXRlQ2h1bmtIYW5kbGVyKCdncmlkJylcbiAgICAuaGFuZGxlS2V5cygnc2hvd0hlYWRlcicsICdzaG93Rm9vdGVyJywgJ2ZvY3VzTW9kZScsICd1c2VQYWdpbmF0aW9uJywgJ21pbkRhdGFWaWV3SGVpZ2h0JylcbiAgICAuc2VyaWFsaXplKChrZXksIGN0eCkgPT4ge1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gY3R4LnNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH0pXG4gICAgLmRlc2VyaWFsaXplKCAoa2V5LCBzdGF0ZVZhbHVlLCBjdHgpID0+IHtcbiAgICAgIC8vIFdlIG11c3QgYXNzZXJ0IHRoZSB0eXBlIHN0YXJ0aW5nIGZyb20gMy41IG9ud2FyZHNcbiAgICAgIC8vIFNlZSBcIkZpeGVzIHRvIHVuc291bmQgd3JpdGVzIHRvIGluZGV4ZWQgYWNjZXNzIHR5cGVzXCIgaW4gaHR0cHM6Ly9kZXZibG9ncy5taWNyb3NvZnQuY29tL3R5cGVzY3JpcHQvYW5ub3VuY2luZy10eXBlc2NyaXB0LTMtNVxuICAgICAgY3R4LnNvdXJjZVtrZXkgYXMgYW55XSA9IHN0YXRlVmFsdWU7XG4gICAgfSlcbiAgICAucmVnaXN0ZXIoKTtcbn1cbiJdfQ==