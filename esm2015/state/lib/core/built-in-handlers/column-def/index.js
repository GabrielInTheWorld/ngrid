import { utils } from '@pebula/ngrid';
import { createStateChunkHandler } from '../../handling';
import { stateVisor } from '../../state-visor';
import { registerColumnDefChildHandlers } from './children';
function runChildChunksForRowMetaColumns(childChunkId, ctx, columns) {
    const stateColumns = [];
    for (const col of columns) {
        const c = {};
        ctx.runChildChunk(childChunkId, c, col);
        stateColumns.push(c);
    }
    return stateColumns;
}
/** Runs the process for the `header` and `footer` sections in the `table` section (if they exist) */
function runChildChunkForDataMetaRows(mode, state, ctx) {
    const { columnStore } = ctx.extApi;
    const { table } = ctx.source;
    for (const kind of ['header', 'footer']) {
        // This is a mapping of the from->to relationship (i.e serializing or deserializing)
        const src = mode === 's' ? table : state;
        const dest = src === table ? state : table;
        // we need to have a source
        if (src[kind]) {
            const active = kind === 'header' ? columnStore.headerColumnDef : columnStore.footerColumnDef;
            if (!dest[kind]) {
                dest[kind] = {};
            }
            ctx.runChildChunk('dataMetaRow', state[kind], table[kind], { kind, active });
        }
    }
}
function runChildChunksForRowDataColumns(mode, state, ctx) {
    const { table } = ctx.source;
    const src = mode === 's' ? table : state;
    const resolve = src === state
        ? col => ({ colState: col, pblColumn: table.cols.find(tCol => (utils.isPblColumn(tCol) && tCol.orgProp === col.prop) || (tCol.id === col.id || tCol.prop === col.prop)) })
        : col => ({ colState: state.cols[state.cols.push({}) - 1], pblColumn: utils.isPblColumn(col) && col });
    if (src.cols && src.cols.length > 0) {
        for (const col of src.cols) {
            const { colState, pblColumn } = resolve(col);
            const data = {
                pblColumn: utils.isPblColumn(pblColumn) && pblColumn,
                activeColumn: ctx.grid.columnApi.findColumn(col.id || col.prop),
            };
            ctx.runChildChunk('dataColumn', colState, pblColumn, data);
        }
    }
}
export function registerColumnDefHandlers() {
    stateVisor.registerRootChunkSection('columns', {
        sourceMatcher: ctx => ctx.grid.columns,
        stateMatcher: state => state.columns || (state.columns = {
            table: {
                cols: [],
            },
            header: [],
            footer: [],
            headerGroup: [],
        })
    });
    createStateChunkHandler('columns')
        .handleKeys('table', 'header', 'headerGroup', 'footer')
        .serialize((key, ctx) => {
        switch (key) {
            case 'table':
                const state = { cols: [] };
                runChildChunkForDataMetaRows('s', state, ctx);
                runChildChunksForRowDataColumns('s', state, ctx);
                return state;
            case 'header':
            case 'footer':
                const source = ctx.source[key];
                if (source && source.length > 0) {
                    const rows = [];
                    for (const row of source) {
                        const r = {};
                        ctx.runChildChunk('metaRow', r, row);
                        r.cols = runChildChunksForRowMetaColumns('metaColumn', ctx, row.cols);
                        rows.push(r);
                    }
                    return rows;
                }
                break;
            case 'headerGroup':
                const headerGroupSource = ctx.source.headerGroup;
                if (headerGroupSource && headerGroupSource.length > 0) {
                    const rows = [];
                    for (const row of headerGroupSource) {
                        const r = {};
                        ctx.runChildChunk('metaGroupRow', r, row);
                        r.cols = runChildChunksForRowMetaColumns('metaColumn', ctx, row.cols);
                        rows.push(r);
                    }
                    return rows;
                }
                break;
        }
    })
        .deserialize((key, stateValue, ctx) => {
        switch (key) {
            case 'table':
                const state = stateValue;
                runChildChunkForDataMetaRows('d', state, ctx);
                runChildChunksForRowDataColumns('d', state, ctx);
                break;
            case 'header':
            case 'footer':
                const source = ctx.source[key];
                const metaRowsState = stateValue;
                if (metaRowsState && metaRowsState.length > 0) {
                    for (const rowState of metaRowsState) {
                        const row = source.find(r => r.rowIndex === rowState.rowIndex);
                        if (row) {
                            ctx.runChildChunk('metaRow', rowState, row);
                            for (const colState of rowState.cols) {
                                const col = row.cols.find(r => r.id === colState.id);
                                if (col) {
                                    const activeColStore = ctx.extApi.columnStore.find(colState.id);
                                    ctx.runChildChunk('metaColumn', colState, col);
                                }
                            }
                        }
                    }
                }
                break;
            case 'headerGroup':
                break;
        }
    })
        .register();
    registerColumnDefChildHandlers();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25ncmlkL3N0YXRlL3NyYy9saWIvY29yZS9idWlsdC1pbi1oYW5kbGVycy9jb2x1bW4tZGVmL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRy9DLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUU1RCxTQUFTLCtCQUErQixDQUF5QyxZQUFvQixFQUFFLEdBQXlDLEVBQUUsT0FBZTtJQUMvSixNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7SUFDeEIsS0FBSyxNQUFNLEdBQUcsSUFBSSxPQUFPLEVBQUU7UUFDekIsTUFBTSxDQUFDLEdBQWlDLEVBQVMsQ0FBQztRQUNsRCxHQUFHLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDeEMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN0QjtJQUNELE9BQU8sWUFBWSxDQUFDO0FBQ3RCLENBQUM7QUFFRCxxR0FBcUc7QUFDckcsU0FBUyw0QkFBNEIsQ0FBQyxJQUFlLEVBQUUsS0FBZ0QsRUFBRSxHQUF5QztJQUNoSixNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUNuQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUM3QixLQUFLLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBK0IsRUFBRTtRQUNyRSxvRkFBb0Y7UUFDcEYsTUFBTSxHQUFHLEdBQUcsSUFBSSxL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J0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgY3JlYXRlU3RhdGVDaHVua0hhbmRsZXIgfSBmcm9tICcuLi8uLi9oYW5kbGluZyc7XG5pbXBvcnQgeyBzdGF0ZVZpc29yIH0gZnJvbSAnLi4vLi4vc3RhdGUtdmlzb3InO1xuaW1wb3J0IHsgU3RhdGVDaHVua3MsIFBibE5ncmlkU3RhdGVDaHVua0NvbnRleHQgfSBmcm9tICcuLi8uLi9tb2RlbHMvaW5kZXgnO1xuaW1wb3J0IHsgUGJsTmdyaWRNZXRhUm93U2V0U3RhdGUsIFBibE5ncmlkTWV0YUNvbHVtblN0YXRlLCBQYmxOZ3JpZEdyb3VwQ29sdW1uU3RhdGUsIFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldFN0YXRlIH0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQgeyByZWdpc3RlckNvbHVtbkRlZkNoaWxkSGFuZGxlcnMgfSBmcm9tICcuL2NoaWxkcmVuJztcblxuZnVuY3Rpb24gcnVuQ2hpbGRDaHVua3NGb3JSb3dNZXRhQ29sdW1uczxUQ29sLCBUQ2hpbGQgZXh0ZW5kcyBrZXlvZiBTdGF0ZUNodW5rcz4oY2hpbGRDaHVua0lkOiBUQ2hpbGQsIGN0eDogUGJsTmdyaWRTdGF0ZUNodW5rQ29udGV4dDxcImNvbHVtbnNcIj4sIGNvbHVtbnM6IFRDb2xbXSkge1xuICBjb25zdCBzdGF0ZUNvbHVtbnMgPSBbXTtcbiAgZm9yIChjb25zdCBjb2wgb2YgY29sdW1ucykge1xuICAgIGNvbnN0IGM6IFN0YXRlQ2h1bmtzW1RDaGlsZF1bJ3N0YXRlJ10gPSB7fSBhcyBhbnk7XG4gICAgY3R4LnJ1bkNoaWxkQ2h1bmsoY2hpbGRDaHVua0lkLCBjLCBjb2wpO1xuICAgIHN0YXRlQ29sdW1ucy5wdXNoKGMpO1xuICB9XG4gIHJldHVybiBzdGF0ZUNvbHVtbnM7XG59XG5cbi8qKiBSdW5zIHRoZSBwcm9jZXNzIGZvciB0aGUgYGhlYWRlcmAgYW5kIGBmb290ZXJgIHNlY3Rpb25zIGluIHRoZSBgdGFibGVgIHNlY3Rpb24gKGlmIHRoZXkgZXhpc3QpICovXG5mdW5jdGlvbiBydW5DaGlsZENodW5rRm9yRGF0YU1ldGFSb3dzKG1vZGU6ICdzJyB8ICdkJywgc3RhdGU6IFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldFN0YXRlWyd0YWJsZSddLCBjdHg6IFBibE5ncmlkU3RhdGVDaHVua0NvbnRleHQ8XCJjb2x1bW5zXCI+KSB7XG4gIGNvbnN0IHsgY29sdW1uU3RvcmUgfSA9IGN0eC5leHRBcGk7XG4gIGNvbnN0IHsgdGFibGUgfSA9IGN0eC5zb3VyY2U7XG4gIGZvciAoY29uc3Qga2luZCBvZiBbJ2hlYWRlcicsICdmb290ZXInXSBhcyBBcnJheTwnaGVhZGVyJyB8ICdmb290ZXInPikge1xuICAgIC8vIFRoaXMgaXMgYSBtYXBwaW5nIG9mIHRoZSBmcm9tLT50byByZWxhdGlvbnNoaXAgKGkuZSBzZXJpYWxpemluZyBvciBkZXNlcmlhbGl6aW5nKVxuICAgIGNvbnN0IHNyYyA9IG1vZGUgPT09ICdzJyA/IHRhYmxlIDogc3RhdGU7XG4gICAgY29uc3QgZGVzdCA9IHNyYyA9PT0gdGFibGUgPyBzdGF0ZSA6IHRhYmxlO1xuXG4gICAgLy8gd2UgbmVlZCB0byBoYXZlIGEgc291cmNlXG4gICAgaWYgKHNyY1traW5kXSkge1xuICAgICAgY29uc3QgYWN0aXZlID0ga2luZCA9PT0gJ2hlYWRlcicgPyBjb2x1bW5TdG9yZS5oZWFkZXJDb2x1bW5EZWYgOiBjb2x1bW5TdG9yZS5mb290ZXJDb2x1bW5EZWY7XG4gICAgICBpZiAoIWRlc3Rba2luZF0pIHsgZGVzdFtraW5kXSA9IHt9OyB9XG4gICAgICBjdHgucnVuQ2hpbGRDaHVuaygnZGF0YU1ldGFSb3cnLCBzdGF0ZVtraW5kXSwgdGFibGVba2luZF0sIHsga2luZCwgYWN0aXZlIH0pO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBydW5DaGlsZENodW5rc0ZvclJvd0RhdGFDb2x1bW5zKG1vZGU6ICdzJyB8ICdkJywgc3RhdGU6IFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldFN0YXRlWyd0YWJsZSddLCBjdHg6IFBibE5ncmlkU3RhdGVDaHVua0NvbnRleHQ8XCJjb2x1bW5zXCI+KSB7XG4gIGNvbnN0IHsgdGFibGUgfSA9IGN0eC5zb3VyY2U7XG4gIGNvbnN0IHNyYyA9IG1vZGUgPT09ICdzJyA/IHRhYmxlIDogc3RhdGU7XG5cbiAgY29uc3QgcmVzb2x2ZSA9IHNyYyA9PT0gc3RhdGVcbiAgICA/IGNvbCA9PiAoeyBjb2xTdGF0ZTogY29sLCBwYmxDb2x1bW46IHRhYmxlLmNvbHMuZmluZCggdENvbCA9PiAodXRpbHMuaXNQYmxDb2x1bW4odENvbCkgJiYgdENvbC5vcmdQcm9wID09PSBjb2wucHJvcCkgfHwgKHRDb2wuaWQgPT09IGNvbC5pZCB8fCB0Q29sLnByb3AgPT09IGNvbC5wcm9wKSApIH0pXG4gICAgOiBjb2wgPT4gKHsgY29sU3RhdGU6IHN0YXRlLmNvbHNbc3RhdGUuY29scy5wdXNoKHt9IGFzIGFueSkgLSAxXSAsIHBibENvbHVtbjogdXRpbHMuaXNQYmxDb2x1bW4oY29sKSAmJiBjb2wgfSlcbiAgO1xuXG4gIGlmIChzcmMuY29scyAmJiBzcmMuY29scy5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChjb25zdCBjb2wgb2Ygc3JjLmNvbHMpIHtcbiAgICAgIGNvbnN0IHsgY29sU3RhdGUsIHBibENvbHVtbiB9ID0gcmVzb2x2ZShjb2wpXG5cbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIHBibENvbHVtbjogdXRpbHMuaXNQYmxDb2x1bW4ocGJsQ29sdW1uKSAmJiBwYmxDb2x1bW4sXG4gICAgICAgIGFjdGl2ZUNvbHVtbjogY3R4LmdyaWQuY29sdW1uQXBpLmZpbmRDb2x1bW4oY29sLmlkIHx8IGNvbC5wcm9wKSxcbiAgICAgIH1cbiAgICAgIGN0eC5ydW5DaGlsZENodW5rKCdkYXRhQ29sdW1uJywgY29sU3RhdGUsIHBibENvbHVtbiwgZGF0YSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckNvbHVtbkRlZkhhbmRsZXJzKCkge1xuICBzdGF0ZVZpc29yLnJlZ2lzdGVyUm9vdENodW5rU2VjdGlvbihcbiAgICAnY29sdW1ucycsXG4gICAge1xuICAgICAgc291cmNlTWF0Y2hlcjogY3R4ID0+IGN0eC5ncmlkLmNvbHVtbnMsXG4gICAgICBzdGF0ZU1hdGNoZXI6IHN0YXRlID0+IHN0YXRlLmNvbHVtbnMgfHwgKHN0YXRlLmNvbHVtbnMgPSB7XG4gICAgICAgIHRhYmxlOiB7XG4gICAgICAgICAgY29sczogW10sXG4gICAgICAgIH0sXG4gICAgICAgIGhlYWRlcjogW10sXG4gICAgICAgIGZvb3RlcjogW10sXG4gICAgICAgIGhlYWRlckdyb3VwOiBbXSxcbiAgICAgIH0pXG4gICAgfVxuICApO1xuXG4gIGNyZWF0ZVN0YXRlQ2h1bmtIYW5kbGVyKCdjb2x1bW5zJylcbiAgICAuaGFuZGxlS2V5cygndGFibGUnLCAnaGVhZGVyJywgJ2hlYWRlckdyb3VwJywgJ2Zvb3RlcicpXG4gICAgLnNlcmlhbGl6ZSggKGtleSwgY3R4KSA9PiB7XG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlICd0YWJsZSc6XG4gICAgICAgICAgY29uc3Qgc3RhdGU6IFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldFN0YXRlWyd0YWJsZSddID0geyBjb2xzOiBbXSB9O1xuICAgICAgICAgIHJ1bkNoaWxkQ2h1bmtGb3JEYXRhTWV0YVJvd3MoJ3MnLCBzdGF0ZSwgY3R4KTtcbiAgICAgICAgICBydW5DaGlsZENodW5rc0ZvclJvd0RhdGFDb2x1bW5zKCdzJywgc3RhdGUsIGN0eCk7XG4gICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICBjYXNlICdmb290ZXInOlxuICAgICAgICAgIGNvbnN0IHNvdXJjZSA9IGN0eC5zb3VyY2Vba2V5XTtcbiAgICAgICAgICBpZiAoc291cmNlICYmIHNvdXJjZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCByb3dzID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJvdyBvZiBzb3VyY2UpIHtcbiAgICAgICAgICAgICAgY29uc3QgcjogUGJsTmdyaWRNZXRhUm93U2V0U3RhdGU8UGJsTmdyaWRNZXRhQ29sdW1uU3RhdGU+ID0ge30gYXMgYW55O1xuICAgICAgICAgICAgICBjdHgucnVuQ2hpbGRDaHVuaygnbWV0YVJvdycsIHIsIHJvdyk7XG4gICAgICAgICAgICAgIHIuY29scyA9IHJ1bkNoaWxkQ2h1bmtzRm9yUm93TWV0YUNvbHVtbnMoJ21ldGFDb2x1bW4nLCBjdHgsIHJvdy5jb2xzKTtcbiAgICAgICAgICAgICAgcm93cy5wdXNoKHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJvd3M7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdoZWFkZXJHcm91cCc6XG4gICAgICAgICAgY29uc3QgaGVhZGVyR3JvdXBTb3VyY2UgPSBjdHguc291cmNlLmhlYWRlckdyb3VwO1xuICAgICAgICAgIGlmIChoZWFkZXJHcm91cFNvdXJjZSAmJiBoZWFkZXJHcm91cFNvdXJjZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCByb3dzID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJvdyBvZiBoZWFkZXJHcm91cFNvdXJjZSkge1xuICAgICAgICAgICAgICBjb25zdCByOiBQYmxOZ3JpZE1ldGFSb3dTZXRTdGF0ZTxQYmxOZ3JpZEdyb3VwQ29sdW1uU3RhdGU+ID0ge30gYXMgYW55O1xuICAgICAgICAgICAgICBjdHgucnVuQ2hpbGRDaHVuaygnbWV0YUdyb3VwUm93Jywgciwgcm93KTtcbiAgICAgICAgICAgICAgci5jb2xzID0gcnVuQ2hpbGRDaHVua3NGb3JSb3dNZXRhQ29sdW1ucygnbWV0YUNvbHVtbicsIGN0eCwgcm93LmNvbHMpO1xuICAgICAgICAgICAgICByb3dzLnB1c2gocik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcm93cztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSlcbiAgICAuZGVzZXJpYWxpemUoIChrZXksIHN0YXRlVmFsdWUsIGN0eCkgPT4ge1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSAndGFibGUnOlxuICAgICAgICAgIGNvbnN0IHN0YXRlID0gc3RhdGVWYWx1ZSBhcyBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXRTdGF0ZVsndGFibGUnXTtcbiAgICAgICAgICBydW5DaGlsZENodW5rRm9yRGF0YU1ldGFSb3dzKCdkJywgc3RhdGUsIGN0eCk7XG4gICAgICAgICAgcnVuQ2hpbGRDaHVua3NGb3JSb3dEYXRhQ29sdW1ucygnZCcsIHN0YXRlLCBjdHgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICBjYXNlICdmb290ZXInOlxuICAgICAgICAgIGNvbnN0IHNvdXJjZSA9IGN0eC5zb3VyY2Vba2V5XTtcbiAgICAgICAgICBjb25zdCBtZXRhUm93c1N0YXRlID0gc3RhdGVWYWx1ZSBhcyBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXRTdGF0ZVsnaGVhZGVyJ107XG4gICAgICAgICAgaWYgKG1ldGFSb3dzU3RhdGUgJiYgbWV0YVJvd3NTdGF0ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJvd1N0YXRlIG9mIG1ldGFSb3dzU3RhdGUpIHtcbiAgICAgICAgICAgICAgY29uc3Qgcm93ID0gc291cmNlLmZpbmQoIHIgPT4gci5yb3dJbmRleCA9PT0gcm93U3RhdGUucm93SW5kZXggKTtcbiAgICAgICAgICAgICAgaWYgKHJvdykge1xuICAgICAgICAgICAgICAgIGN0eC5ydW5DaGlsZENodW5rKCdtZXRhUm93Jywgcm93U3RhdGUsIHJvdyk7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBjb2xTdGF0ZSBvZiByb3dTdGF0ZS5jb2xzKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBjb2wgPSByb3cuY29scy5maW5kKCByID0+IHIuaWQgPT09IGNvbFN0YXRlLmlkKTtcbiAgICAgICAgICAgICAgICAgIGlmIChjb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlQ29sU3RvcmUgPSBjdHguZXh0QXBpLmNvbHVtblN0b3JlLmZpbmQoY29sU3RhdGUuaWQpO1xuICAgICAgICAgICAgICAgICAgICBjdHgucnVuQ2hpbGRDaHVuaygnbWV0YUNvbHVtbicsIGNvbFN0YXRlLCBjb2wpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnaGVhZGVyR3JvdXAnOlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pXG4gICAgLnJlZ2lzdGVyKCk7XG5cbiAgICByZWdpc3RlckNvbHVtbkRlZkNoaWxkSGFuZGxlcnMoKTtcbn1cblxuZXhwb3J0IHtcbiAgUGJsTmdyaWRNZXRhQ29sdW1uU3RhdGUsXG4gIFBibE5ncmlkR3JvdXBDb2x1bW5TdGF0ZSxcbiAgUGJsTmdyaWRDb2x1bW5TdGF0ZSxcbiAgUGJsTmdyaWRNZXRhUm93U3RhdGUsXG4gIFBibE5ncmlkTWV0YVJvd1NldFN0YXRlLFxuICBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXRTdGF0ZSxcbn0gZnJvbSAnLi9tb2RlbCc7XG4iXX0=