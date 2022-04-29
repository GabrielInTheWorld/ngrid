export function noDataViewLogicap(extApi) {
    let noDateEmbeddedVRef;
    const logicap = (force) => {
        if (noDateEmbeddedVRef) {
            extApi.grid.removeView(noDateEmbeddedVRef, 'beforeContent');
            noDateEmbeddedVRef = undefined;
            logicap.viewActive = false;
        }
        if (force === false) {
            return;
        }
        const noData = extApi.grid.ds && extApi.grid.ds.renderLength === 0;
        if (noData) {
            extApi.grid.addClass('pbl-ngrid-empty');
        }
        else {
            extApi.grid.removeClass('pbl-ngrid-empty');
        }
        if (noData || force === true) {
            const noDataTemplate = extApi.registry.getSingle('noData');
            if (noDataTemplate) {
                noDateEmbeddedVRef = extApi.grid.createView('beforeContent', noDataTemplate.tRef, { $implicit: extApi.grid }, 0);
                logicap.viewActive = true;
            }
        }
    };
    return logicap;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8tZGF0YS12aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3JpZC9zcmMvbGliL2dyaWQvbG9naWNhcC9uby1kYXRhLXZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUUEsTUFBTSxVQUFVLGlCQUFpQixDQUFDLE1BQW9DO0lBQ3BFLElBQUksa0JBQXdDLENBQUM7SUFFN0MsTUFBTSxPQUFPLEdBQXNCLENBQUMsS0FBZSxFQUFFLEVBQUU7UUFDckQsSUFBSSxrQkFBa0IsRUFBRTtZQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxlQUFlLENBQUMsQ0FBQztZQUM1RCxrQkFBa0IsR0FBRyxTQUFTLENBQUM7WUFDL0IsT0FBTyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7U0FDNUI7UUFFRCxJQUFJLEtBQUssS0FBSyxLQUFLLEVBQUU7WUFDbkIsT0FBTztTQUNSO1FBR0QsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxLQUFLLENBQUMsQ0FBQztRQUNuRSxJQUFJLE1BQU0sRUFBRTtZQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDekM7YUFBTTtZQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDNUM7UUFFRCxJQUFJLE1BQU0sSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQzVCLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNELElBQUksY0FBYyxFQUFFO2dCQUNsQixrQkFBa0IsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsY0FBYyxDQUFDLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pILE9BQU8sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO2FBQzNCO1NBQ0Y7SUFDSCxDQUFDLENBQUM7SUFFRixPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW1iZWRkZWRWaWV3UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZEludGVybmFsRXh0ZW5zaW9uQXBpIH0gZnJvbSAnLi4vLi4vZXh0L2dyaWQtZXh0LWFwaSc7XG5cbmludGVyZmFjZSBOb0RhdGFWaWV3TG9naWNhcCB7XG4gIChmb3JjZT86IGJvb2xlYW4pOiB2b2lkO1xuICB2aWV3QWN0aXZlPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vRGF0YVZpZXdMb2dpY2FwKGV4dEFwaTogUGJsTmdyaWRJbnRlcm5hbEV4dGVuc2lvbkFwaSk6IE5vRGF0YVZpZXdMb2dpY2FwIHtcbiAgbGV0IG5vRGF0ZUVtYmVkZGVkVlJlZjogRW1iZWRkZWRWaWV3UmVmPGFueT47XG5cbiAgY29uc3QgbG9naWNhcDogTm9EYXRhVmlld0xvZ2ljYXAgPSAoZm9yY2U/OiBib29sZWFuKSA9PiB7XG4gICAgaWYgKG5vRGF0ZUVtYmVkZGVkVlJlZikge1xuICAgICAgZXh0QXBpLmdyaWQucmVtb3ZlVmlldyhub0RhdGVFbWJlZGRlZFZSZWYsICdiZWZvcmVDb250ZW50Jyk7XG4gICAgICBub0RhdGVFbWJlZGRlZFZSZWYgPSB1bmRlZmluZWQ7XG4gICAgICBsb2dpY2FwLnZpZXdBY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoZm9yY2UgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG5cbiAgICBjb25zdCBub0RhdGEgPSBleHRBcGkuZ3JpZC5kcyAmJiBleHRBcGkuZ3JpZC5kcy5yZW5kZXJMZW5ndGggPT09IDA7XG4gICAgaWYgKG5vRGF0YSkge1xuICAgICAgZXh0QXBpLmdyaWQuYWRkQ2xhc3MoJ3BibC1uZ3JpZC1lbXB0eScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHRBcGkuZ3JpZC5yZW1vdmVDbGFzcygncGJsLW5ncmlkLWVtcHR5Jyk7XG4gICAgfVxuXG4gICAgaWYgKG5vRGF0YSB8fCBmb3JjZSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3Qgbm9EYXRhVGVtcGxhdGUgPSBleHRBcGkucmVnaXN0cnkuZ2V0U2luZ2xlKCdub0RhdGEnKTtcbiAgICAgIGlmIChub0RhdGFUZW1wbGF0ZSkge1xuICAgICAgICBub0RhdGVFbWJlZGRlZFZSZWYgPSBleHRBcGkuZ3JpZC5jcmVhdGVWaWV3KCdiZWZvcmVDb250ZW50Jywgbm9EYXRhVGVtcGxhdGUudFJlZiwgeyAkaW1wbGljaXQ6IGV4dEFwaS5ncmlkIH0sIDApO1xuICAgICAgICBsb2dpY2FwLnZpZXdBY3RpdmUgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbG9naWNhcDtcbn1cbiJdfQ==