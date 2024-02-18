import { init } from 'snabbdom/build/init.js';
import { h } from 'snabbdom/build/h.js';
import { eventListenersModule } from 'snabbdom/build/modules/eventlisteners.js';

const patch = init([eventListenersModule]);

export const createApp = ({ template, initialState, mountCallback, stateChangeCallback }) => {
  let state = initialState;
  let oldVNode;

  const updateState = (newState) => {
    state = { ...state, ...newState };
    render();
    if (typeof stateChangeCallback === 'function') {
      stateChangeCallback(state);
    }
  };

  const render = () => {
    const newVNode = template({ state, updateState });
    patch(oldVNode || null, newVNode);
    oldVNode = newVNode;
  };

  if (typeof document !== 'undefined') {
    const rootNode = document.getElementById('app');

    // Mounting
    if (!oldVNode) {
      oldVNode = template({ state, updateState });
      patch(rootNode, oldVNode);

      // Lifecycle events
      if (typeof mountCallback === 'function') {
        mountCallback();
      }
    }
  }
  return { updateState };
};

export { h };