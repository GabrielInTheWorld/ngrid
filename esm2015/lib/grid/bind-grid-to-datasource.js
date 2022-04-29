export function bindGridToDataSource(extApi) {
    extApi.events.subscribe(event => {
        if (event.kind === 'onDataSource') {
            const { curr, prev } = event;
            if (prev && prev.hostGrid === extApi.grid) {
                prev.hostGrid = undefined;
            }
            if (curr) {
                curr.hostGrid = extApi.grid;
            }
        }
        else if (event.kind === 'onDestroy') {
            const ds = extApi.grid.ds;
            if (ds.hostGrid === extApi.grid) {
                ds.hostGrid = undefined;
            }
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZC1ncmlkLXRvLWRhdGFzb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL25ncmlkL3NyYy9saWIvZ3JpZC9iaW5kLWdyaWQtdG8tZGF0YXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFTQSxNQUFNLFVBQVUsb0JBQW9CLENBQUMsTUFBb0M7SUFDdkUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUUsS0FBSyxDQUFDLEVBQUU7UUFDL0IsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLGNBQWMsRUFBRTtZQUNqQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQztZQUM3QixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO2FBQzNCO1lBQ0QsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQzdCO1NBQ0Y7YUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssV0FBVyxFQUFFO1lBQ3JDLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQzFCLElBQUksRUFBRSxDQUFDLFFBQVEsS0FBSyxNQUFNLENBQUMsSUFBSSxFQUFFO2dCQUMvQixFQUFFLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQzthQUN6QjtTQUNGO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsTmdyaWRJbnRlcm5hbEV4dGVuc2lvbkFwaSB9IGZyb20gJy4uL2V4dC9ncmlkLWV4dC1hcGknO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuL25ncmlkLmNvbXBvbmVudCc7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2NvcmUvbGliL2RhdGEtc291cmNlL2RhdGEtc291cmNlJyB7XG4gIGludGVyZmFjZSBQYmxEYXRhU291cmNlPFQgPSBhbnksIFREYXRhID0gYW55PiB7XG4gICAgaG9zdEdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PFQ+O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5kR3JpZFRvRGF0YVNvdXJjZShleHRBcGk6IFBibE5ncmlkSW50ZXJuYWxFeHRlbnNpb25BcGkpOiB2b2lkIHtcbiAgZXh0QXBpLmV2ZW50cy5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICBpZiAoZXZlbnQua2luZCA9PT0gJ29uRGF0YVNvdXJjZScpIHtcbiAgICAgIGNvbnN0IHsgY3VyciwgcHJldiB9ID0gZXZlbnQ7XG4gICAgICBpZiAocHJldiAmJiBwcmV2Lmhvc3RHcmlkID09PSBleHRBcGkuZ3JpZCkge1xuICAgICAgICBwcmV2Lmhvc3RHcmlkID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnIpIHtcbiAgICAgICAgY3Vyci5ob3N0R3JpZCA9IGV4dEFwaS5ncmlkO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZXZlbnQua2luZCA9PT0gJ29uRGVzdHJveScpIHtcbiAgICAgIGNvbnN0IGRzID0gZXh0QXBpLmdyaWQuZHM7XG4gICAgICBpZiAoZHMuaG9zdEdyaWQgPT09IGV4dEFwaS5ncmlkKSB7XG4gICAgICAgIGRzLmhvc3RHcmlkID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG4iXX0=