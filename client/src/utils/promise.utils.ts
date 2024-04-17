export async function loadSync(
  queue: (() => Promise<any>)[],
  onChange: (data: any, index: number) => any,
  onError: (error, index: number) => any
) {
  const payload = [];

  for (let index = 0; index < queue.length; index++) {
    const data = await queue[index]().catch((error) => {
      onError(error, index);
    });
    onChange(data, index);

    payload.push(data);
  }

  return payload;
}

export async function delayMS(ms: number, response = null) {
  return new Promise((res) => {
    setTimeout(res, ms, response);
  });
}
