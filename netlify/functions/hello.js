// netlify/functions/hello.js
exports.handler = async (event, context) => {
  // 1. 从URL参数获取 `name` (例如: ?name=John)
  const { name = "访客" } = event.queryStringParameters;

  // 2. 构建响应内容
  const message = `你好，${name}! 当前时间: ${new Date().toLocaleTimeString()}`;

  // 3. 返回 JSON 格式的响应
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  };
};
