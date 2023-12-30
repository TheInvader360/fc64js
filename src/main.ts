function greeter(entity: string) {
  return `Hello ${entity}!`;
}

const entity: string = 'World';

document.body.textContent = greeter(entity);
