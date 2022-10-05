const isEsc = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
const isSubmit = (evt) => evt.type === 'submit';
const isCtrlEnter = (evt) => (evt.ctrlKey || evt.metaKey) && evt.key === 'Enter';

export { isEsc, isSubmit, isCtrlEnter };
