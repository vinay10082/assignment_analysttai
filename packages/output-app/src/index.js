import { createApp, h } from '../../my-ui-library/src/index.js';


const template = ({ state, updateState }) => {
  
  const handleClick = () => {
    updateState({ count: state.count + 1 });
  };

  return h('div', [
    h('h1', `Count: ${state.count}`),
    h('button', {on: {click: handleClick }}, 'Add'),
  ]);
};

const initialState = { count: 0 };

const mountCallback = () => {
  console.log('Component is mounted.');
};

const stateChangeCallback = () => {
  console.log('State is changed.');
};


const { updateState } = createApp({ 
  template, 
  initialState,
  mountCallback,
  stateChangeCallback
 });
