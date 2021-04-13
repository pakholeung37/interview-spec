export function create(context) {
  const body = document.body;
  const dom = document.createElement('div');
  dom.innerHTML = context;
  body.append(dom);
}