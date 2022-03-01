import { stateVisor } from './state-visor';
import * as U from './utils';
export function hasState(grid, options) {
    return Promise.resolve()
        .then(() => {
        options = U.normalizeOptions('save', options);
        const id = U.resolveId(grid, options);
        return options.persistenceAdapter.exists(id);
    });
}
export function saveState(grid, options) {
    return Promise.resolve()
        .then(() => {
        options = U.normalizeOptions('save', options);
        const id = U.resolveId(grid, options);
        const state = {};
        const context = U.createChunkSectionContext(grid, options);
        for (const [chunkId, chunkConfig] of stateVisor.getRootSections()) {
            const keyPredicate = U.stateKeyPredicateFactory(chunkId, options, true);
            if (!keyPredicate || keyPredicate(chunkId)) {
                const sectionState = chunkConfig.stateMatcher(state);
                const chunkContext = U.createChunkContext(context, chunkConfig, 'serialize');
                const defs = stateVisor.getDefinitionsForSection(chunkId);
                for (const def of defs) {
                    U.serialize(def, sectionState, chunkContext);
                }
            }
        }
        return options.persistenceAdapter.save(id, state);
    });
}
export function loadState(grid, options) {
    return Promise.resolve()
        .then(() => {
        options = U.normalizeOptions('load', options);
        const id = U.resolveId(grid, options);
        return options.persistenceAdapter.load(id)
            .then(state => {
            const context = U.createChunkSectionContext(grid, options);
            for (const [chunkId, chunkConfig] of stateVisor.getRootSections()) {
                const keyPredicate = U.stateKeyPredicateFactory(chunkId, options, true);
                if (!keyPredicate || keyPredicate(chunkId)) {
                    const sectionState = chunkConfig.stateMatcher(state);
                    const chunkContext = U.createChunkContext(context, chunkConfig, 'deserialize');
                    const defs = stateVisor.getDefinitionsForSection(chunkId);
                    for (const def of defs) {
                        U.deserialize(def, sectionState, chunkContext);
                    }
                }
            }
            return state;
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25ncmlkL3N0YXRlL3NyYy9saWIvY29yZS9zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sS0FBSyxDQUFDLE1BQU0sU0FBUyxDQUFDO0FBRTdCLE1BQU0sVUFBVSxRQUFRLENBQUMsSUFBdUIsRUFBRSxPQUE4QjtJQUM5RSxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUU7U0FDckIsSUFBSSxDQUFFLEdBQUcsRUFBRTtRQUNWLE9BQU8sR0FBRyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzlDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sT0FBTyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMvQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRCxNQUFNLFVBQVUsU0FBUyxDQUFDLElBQXVCLEVBQUUsT0FBa0M7SUFDbkYsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFO1NBQ3JCLElBQUksQ0FBRSxHQUFHLEVBQUU7UUFDVixPQUFPLEdBQUcsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM5QyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN0QyxNQUFNLEtBQUssR0FBd0IsRUFBUyxDQUFDO1FBQzdDLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFM0QsS0FBSyxNQUFNLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxlQUFlLEVBQUUsRUFBRTtZQUNqRSxNQUFNLFlBQVksR0FBRyxDQUFDLENBQUMsd0JBQXdCLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUV4RSxJQUFJLENBQUMsWUFBWSxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDMUMsTUFBTSxZQUFZLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckQsTUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBRTdFLE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDMUQsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUU7b0JBQ3RCLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztpQkFDOUM7YUFDRjtTQUNGO1FBQ0QsT0FBTyxPQUFPLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNwRCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRCxNQUFNLFVBQVUsU0FBUyxDQUFDLElBQXVCLEVBQUUsT0FBa0M7SUFDbkYsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFO1NBQ3JCLElBQUksQ0FBRSxHQUFHLEVBQUU7UUFDVixPQUFPLEdBQUcsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM5QyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN0QyxPQUFPLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2FBQ3ZDLElBQUksQ0FBRSxLQUFLLENBQUMsRUFBRTtZQUNiLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFM0QsS0FBSyxNQUFNLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxlQUFlLEVBQUUsRUFBRTtnQkFDakUsTUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBRXhFLElBQUksQ0FBQyxZQUFZLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUMxQyxNQUFNLFlBQVksR0FBRyxXQUFXLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNyRCxNQUFNLFlBQVksR0FBRyxDQUFDLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxhQUFhLENBQUMsQ0FBQztvQkFFL0UsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUMxRCxLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksRUFBRTt3QkFDdEIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO3FCQUNoRDtpQkFDRjthQUNGO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxOZ3JpZEdsb2JhbFN0YXRlLCBQYmxOZ3JpZFN0YXRlT3B0aW9ucywgUGJsTmdyaWRTdGF0ZVNhdmVPcHRpb25zLCBQYmxOZ3JpZFN0YXRlTG9hZE9wdGlvbnMgfSBmcm9tICcuL21vZGVscy9pbmRleCc7XG5pbXBvcnQgeyBzdGF0ZVZpc29yIH0gZnJvbSAnLi9zdGF0ZS12aXNvcic7XG5pbXBvcnQgKiBhcyBVIGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gaGFzU3RhdGUoZ3JpZDogUGJsTmdyaWRDb21wb25lbnQsIG9wdGlvbnM/OiBQYmxOZ3JpZFN0YXRlT3B0aW9ucyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAudGhlbiggKCkgPT4ge1xuICAgICAgb3B0aW9ucyA9IFUubm9ybWFsaXplT3B0aW9ucygnc2F2ZScsIG9wdGlvbnMpO1xuICAgICAgY29uc3QgaWQgPSBVLnJlc29sdmVJZChncmlkLCBvcHRpb25zKTtcbiAgICAgIHJldHVybiBvcHRpb25zLnBlcnNpc3RlbmNlQWRhcHRlci5leGlzdHMoaWQpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2F2ZVN0YXRlKGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50LCBvcHRpb25zPzogUGJsTmdyaWRTdGF0ZVNhdmVPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgIC50aGVuKCAoKSA9PiB7XG4gICAgICBvcHRpb25zID0gVS5ub3JtYWxpemVPcHRpb25zKCdzYXZlJywgb3B0aW9ucyk7XG4gICAgICBjb25zdCBpZCA9IFUucmVzb2x2ZUlkKGdyaWQsIG9wdGlvbnMpO1xuICAgICAgY29uc3Qgc3RhdGU6IFBibE5ncmlkR2xvYmFsU3RhdGUgPSB7fSBhcyBhbnk7XG4gICAgICBjb25zdCBjb250ZXh0ID0gVS5jcmVhdGVDaHVua1NlY3Rpb25Db250ZXh0KGdyaWQsIG9wdGlvbnMpO1xuXG4gICAgICBmb3IgKGNvbnN0IFtjaHVua0lkLCBjaHVua0NvbmZpZ10gb2Ygc3RhdGVWaXNvci5nZXRSb290U2VjdGlvbnMoKSkge1xuICAgICAgICBjb25zdCBrZXlQcmVkaWNhdGUgPSBVLnN0YXRlS2V5UHJlZGljYXRlRmFjdG9yeShjaHVua0lkLCBvcHRpb25zLCB0cnVlKTtcblxuICAgICAgICBpZiAoIWtleVByZWRpY2F0ZSB8fCBrZXlQcmVkaWNhdGUoY2h1bmtJZCkpIHtcbiAgICAgICAgICBjb25zdCBzZWN0aW9uU3RhdGUgPSBjaHVua0NvbmZpZy5zdGF0ZU1hdGNoZXIoc3RhdGUpO1xuICAgICAgICAgIGNvbnN0IGNodW5rQ29udGV4dCA9IFUuY3JlYXRlQ2h1bmtDb250ZXh0KGNvbnRleHQsIGNodW5rQ29uZmlnLCAnc2VyaWFsaXplJyk7XG5cbiAgICAgICAgICBjb25zdCBkZWZzID0gc3RhdGVWaXNvci5nZXREZWZpbml0aW9uc0ZvclNlY3Rpb24oY2h1bmtJZCk7XG4gICAgICAgICAgZm9yIChjb25zdCBkZWYgb2YgZGVmcykge1xuICAgICAgICAgICAgVS5zZXJpYWxpemUoZGVmLCBzZWN0aW9uU3RhdGUsIGNodW5rQ29udGV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gb3B0aW9ucy5wZXJzaXN0ZW5jZUFkYXB0ZXIuc2F2ZShpZCwgc3RhdGUpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZFN0YXRlKGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50LCBvcHRpb25zPzogUGJsTmdyaWRTdGF0ZUxvYWRPcHRpb25zKTogUHJvbWlzZTxQYmxOZ3JpZEdsb2JhbFN0YXRlPiB7XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgIC50aGVuKCAoKSA9PiB7XG4gICAgICBvcHRpb25zID0gVS5ub3JtYWxpemVPcHRpb25zKCdsb2FkJywgb3B0aW9ucyk7XG4gICAgICBjb25zdCBpZCA9IFUucmVzb2x2ZUlkKGdyaWQsIG9wdGlvbnMpO1xuICAgICAgcmV0dXJuIG9wdGlvbnMucGVyc2lzdGVuY2VBZGFwdGVyLmxvYWQoaWQpXG4gICAgICAgIC50aGVuKCBzdGF0ZSA9PiB7XG4gICAgICAgICAgY29uc3QgY29udGV4dCA9IFUuY3JlYXRlQ2h1bmtTZWN0aW9uQ29udGV4dChncmlkLCBvcHRpb25zKTtcblxuICAgICAgICAgIGZvciAoY29uc3QgW2NodW5rSWQsIGNodW5rQ29uZmlnXSBvZiBzdGF0ZVZpc29yLmdldFJvb3RTZWN0aW9ucygpKSB7XG4gICAgICAgICAgICBjb25zdCBrZXlQcmVkaWNhdGUgPSBVLnN0YXRlS2V5UHJlZGljYXRlRmFjdG9yeShjaHVua0lkLCBvcHRpb25zLCB0cnVlKTtcblxuICAgICAgICAgICAgaWYgKCFrZXlQcmVkaWNhdGUgfHwga2V5UHJlZGljYXRlKGNodW5rSWQpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHNlY3Rpb25TdGF0ZSA9IGNodW5rQ29uZmlnLnN0YXRlTWF0Y2hlcihzdGF0ZSk7XG4gICAgICAgICAgICAgIGNvbnN0IGNodW5rQ29udGV4dCA9IFUuY3JlYXRlQ2h1bmtDb250ZXh0KGNvbnRleHQsIGNodW5rQ29uZmlnLCAnZGVzZXJpYWxpemUnKTtcblxuICAgICAgICAgICAgICBjb25zdCBkZWZzID0gc3RhdGVWaXNvci5nZXREZWZpbml0aW9uc0ZvclNlY3Rpb24oY2h1bmtJZCk7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgZGVmIG9mIGRlZnMpIHtcbiAgICAgICAgICAgICAgICBVLmRlc2VyaWFsaXplKGRlZiwgc2VjdGlvblN0YXRlLCBjaHVua0NvbnRleHQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbiJdfQ==