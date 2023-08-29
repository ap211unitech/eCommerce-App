export const blocker = async (ms?: number) => {
  await new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms ?? 1000);
  });
};
