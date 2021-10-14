const involvemntApi = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';
const appId = 'gggCBSax83rR3Kv2Y5vr';

// we need to make our ID's the same
export default async () => {
  const result = await fetch(`${involvemntApi}apps/${appId}/likes/`, { method: 'GET' });
  const data = await result.text();
  return JSON.parse(data);
};
