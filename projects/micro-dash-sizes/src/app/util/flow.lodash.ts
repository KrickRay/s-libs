import flow from 'lodash-es/flow';

const increment = (x: number): number => x + 1;
flow(increment, (flow as any)())(1);
