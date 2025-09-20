declare module 'vuex' {
  import type { App, InjectionKey } from 'vue';

  export interface Store<S = any> {
    readonly state: S;
    dispatch: (type: string, payload?: any, options?: any) => Promise<any>;
    commit: (type: string, payload?: any, options?: any) => void;
    install: (app: App, injectKey?: InjectionKey<Store<any>> | string) => void;
  }

  export interface StoreOptions<S> {
    state?: S | (() => S);
    getters?: Record<string, any>;
    actions?: Record<string, any>;
    mutations?: Record<string, any>;
    modules?: Record<string, any>;
    plugins?: Array<(store: Store<S>) => any>;
    strict?: boolean;
    devtools?: boolean;
  }

  export function createStore<S>(options: StoreOptions<S>): Store<S>;
  export function useStore<S = any>(injectKey?: InjectionKey<Store<S>> | string): Store<S>;

  const _default: any;
  export default _default;
}

