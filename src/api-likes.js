export const involvemntApi = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';
export const appId = 'gggCBSax83rR3Kv2Y5vr';

export const apiLikes = async () => {
  const result = await fetch(`${involvemntApi}apps/${appId}/likes/`, { method: 'GET' });
  const data = await result.text();
  return JSON.parse(data);
};
