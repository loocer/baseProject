export function post(url, params, target) {
  const form = document.createElement('form');

  form.action = url;
  form.target = target;

  Object.keys(params).forEach((key) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = params[key];
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}
