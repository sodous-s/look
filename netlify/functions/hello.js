const WELCOME_MSG = "你好，我是sodous AI";
const INTRODUCTION = "我是sodous AI，我可以和你聊天，也能帮你写一些简单的Brainfuck代码";
const DEFAULT_RESPONSE = "我听不懂，请换个说法。";

// 情绪状态枚举
const Emotion = {
    HAPPY: 'HAPPY',
    SAD: 'SAD',
    ANGRY: 'ANGRY',
    NEUTRAL: 'NEUTRAL'
};

// 替换字符串中所有特定子串
function replaceAll(str, from, to) {
    return str.split(from).join(to);
}

// 检查字符串是否以特定后缀结尾
function endsWith(str, suffix) {
    return str.endsWith(suffix);
}

// 去除结尾的问号或"吗"
function removeEndingMarks(str) {
    if (endsWith(str, "吗？")) {
        return str.slice(0, -2);
    } else if (str.endsWith("吗") || str.endsWith("？")) {
        return str.slice(0, -1);
    }
    return str;
}

// 模拟思考过程（无实际等待）
function simulateThinking() {
    return "[正在深度思考]...";
}

// 分析用户情绪
function analyzeEmotion(input) {
    console.log("[情感分析中]...");

    // 检测积极情绪关键词
    if (input.includes("开心") ||
        input.includes("高兴") ||
        input.includes("快乐") ||
        input.includes("笑")) {
        console.log("[检测到积极情绪]");
        return Emotion.HAPPY;
    }

    // 检测消极情绪关键词
    if (input.includes("难过") ||
        input.includes("伤心") ||
        input.includes("哭")) {
        console.log("[检测到消极情绪]");
        return Emotion.SAD;
    }

    // 检测愤怒情绪关键词
    if (input.includes("生气") ||
        input.includes("愤怒") ||
        input.includes("气死")) {
        console.log("[检测到愤怒情绪]");
        return Emotion.ANGRY;
    }

    console.log("[情绪状态：平静]");
    return Emotion.NEUTRAL;
}

// 检测用户是否需要编程帮助
function detectProgrammingRequest(input) {
    console.log("[分析用户需求类型]...");

    // 检测编程相关关键词
    if (input.includes("代码") ||
        input.includes("编程") ||
        input.includes("写程序") ||
        input.includes("brainfuck") ||
        input.includes("BF") ||
        input.includes("写代码") ||
        input.includes("程序")) {
        console.log("[检测到编程需求]");
        return true;
    }

    console.log("[需求类型：日常交流]");
    return false;
}

// 生成Brainfuck代码 - 输出Hello World
function generateHelloWorldBF() {
    console.log("[思考：生成Hello World程序]");
    return "++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.";
}

// 生成Brainfuck代码 - 输出指定字符
function generateCharOutputBF(ch) {
    console.log(`[思考：生成输出字符 '${ch}' 的代码]`);
    
    const ascii = ch.charCodeAt(0);
    if (ascii <= 10) {
        return "+".repeat(ascii) + ".";
    } else {
        // 使用循环优化
        const loops = Math.floor(ascii / 10);
        const remainder = ascii % 10;
        return `++++++++++[>${"+".repeat(loops)}<-]>${"+".repeat(remainder)}.`;
    }
}

// 生成Brainfuck代码 - 输出字符串
function generateStringOutputBF(str) {
    console.log(`[思考：生成输出字符串 "${str}" 的代码]`);
    
    if (str.length === 0) return "";
    
    let result = generateCharOutputBF(str[0]);
    
    for (let i = 1; i < str.length; i++) {
        const diff = str.charCodeAt(i) - str.charCodeAt(i-1);
        if (diff > 0) {
            result += "+".repeat(diff);
        } else {
            result += "-".repeat(-diff);
        }
        result += ".";
    }
    
    return result;
}

// 处理编程请求
function processProgrammingRequest(input) {
    console.log("[深度分析编程需求]...");

    // 检测Hello World请求
    if (input.includes("hello") ||
        input.includes("Hello") ||
        input.includes("你好世界")) {
        console.log("[识别需求：Hello World程序]");
        const code = generateHelloWorldBF();
        return `这是Brainfuck的Hello World程序：\n${code}\n\n解释：这个程序会输出'Hello World!'`;
    }

    // 检测输出特定字符串的请求
    if (input.includes("输出") || input.includes("打印")) {
        console.log("[识别需求：输出特定内容]");

        // 简单提取要输出的内容
        if (input.includes("输出")) {
            const pos = input.indexOf("输出");
            if (pos !== -1 && pos + 2 < input.length) {
                let content = input.substring(pos + 2);
                // 移除可能的标点符号
                if (content.endsWith("？") || content.endsWith("！") || content.endsWith("。")) {
                    content = content.slice(0, -1);
                }
                if (content) {
                    const code = generateStringOutputBF(content);
                    return `这是输出"${content}"的Brainfuck代码：\n${code}`;
                }
            }
        }
    }

    return `我可以帮你写一些简单的Brainfuck代码！\n` +
           `比如：\n` +
           `- 说'Hello World'让我生成Hello World程序\n` +
           `- 说'输出XXX'让我生成输出特定内容的代码\n` +
           `- Brainfuck是一种极简的编程语言，只有8个命令：\n` +
           `  > < + - . , [ ]\n` +
           `  >: 右移指针\n` +
           `  <: 左移指针\n` +
           `  +: 当前单元值加1\n` +
           `  -: 当前单元值减1\n` +
           `  .: 输出当前单元的ASCII字符\n` +
           `  ,: 输入一个字符到当前单元\n` +
           `  [: 循环开始\n` +
           `  ]: 循环结束`;
}

// 根据情绪生成个性化回应
function generateEmotionalResponse(emotion, userName) {
    console.log(`[思考：根据情绪状态生成个性化回应]`);
    
    const responses = {
        [Emotion.HAPPY]: [
            "看到你开心我也好开心！😊",
            "哈哈，你笑起来一定很好看！",
            "开心的事情要分享哦，我也想听听！"
        ],
        [Emotion.SAD]: [
            "抱抱你 🤗 不要难过，我会一直陪着你的。",
            "难过的时候可以和我说说，我会认真听的。",
            "每个人都会有低潮期，但阳光总会再来的。"
        ],
        [Emotion.ANGRY]: [
            "深呼吸一下，生气伤身体呢。有什么我可以帮你的吗？",
            "我能感受到你的愤怒，要不要先冷静一下？",
            "生气的时候说出来会好受一些，我在这里听你说。"
        ],
        [Emotion.NEUTRAL]: [
            "和你聊天真愉快！",
            userName ? `今天过得还好吗，${userName}？` : "你今天过得怎么样？",
            "有什么想和我分享的吗？"
        ]
    };

    const options = responses[emotion];
    return options[Math.floor(Math.random() * options.length)];
}

// 主功能处理函数
function processInput(input, userName) {
    console.log("[开始深度分析输入内容]");

    // 检测是否为编程请求
    if (detectProgrammingRequest(input)) {
        return {
            response: processProgrammingRequest(input),
            userName
        };
    }

    // 情绪分析
    const emotion = analyzeEmotion(input);

    // 规则1: 处理"你是谁"查询
    if (input === "你是谁" || input === "你是谁？") {
        console.log("[思考：用户询问我的身份]");
        return {
            response: INTRODUCTION,
            userName
        };
    }

    // 规则2: 处理"我是谁"查询
    if (input === "我是谁" || input === "我是谁？") {
        console.log("[思考：用户询问自己的身份]");
        return {
            response: userName ? `你是${userName}！` : "我还不知道你是谁呢，请先告诉我。",
            userName
        };
    }

    // 规则3: 处理"我是XXX"声明
    if (input.startsWith("我是")) {
        const newUserName = input.substring(2);
        console.log("[思考：用户介绍自己]");
        return {
            response: `你好呀，${newUserName}！很高兴认识你！`,
            userName: newUserName
        };
    }

    // 规则4: 处理"你好"问候
    if (input === "你好") {
        console.log("[思考：用户打招呼]");
        return {
            response: "你好呀！今天过得怎么样？",
            userName
        };
    }

    // 规则5: 处理以"吗"结尾的句子
    if (endsWith(input, "吗") || endsWith(input, "吗？")) {
        console.log("[思考：用户提出疑问]");
        let temp = removeEndingMarks(input);
        temp += "呀！";

        // 转换人称代词
        temp = replaceAll(temp, "我", "{{TEMP}}");
        temp = replaceAll(temp, "你", "我");
        temp = replaceAll(temp, "{{TEMP}}", "你");

        return {
            response: temp,
            userName
        };
    }

    // 情绪化回应
    return {
        response: generateEmotionalResponse(emotion, userName),
        userName
    };
}

// Netlify函数入口
exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const input = body.input || "";
        let userName = body.userName || "";

        // 处理输入
        const result = processInput(input, userName);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                response: result.response,
                userName: result.userName
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
