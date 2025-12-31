export type TimeNavigatorIfc = {
    navidate: (value: 'next' | 'prev' | 'today') => void;
}

export type ViewNavigatorIfc = {
    changeView: (view: 'day' | 'week' | 'month') => void;
}
