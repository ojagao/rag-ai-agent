from bedrock_agentcore import BedrockAgentCoreApp
from agent.core import create_agent
from agent.config import BEDROCK_MODEL_ID, AWS_REGION
import os

app = BedrockAgentCoreApp()
agent = create_agent(
    model_id=BEDROCK_MODEL_ID,
    region=AWS_REGION
)

@app.entrypoint
def invoke(payload, context):
    user_message = payload.get("prompt", "")

    # セッションIDの取得
    session_id = getattr(context, 'session_id', 'default')

    # エージェント実行
    # Note: For MVP, we are not persisting history across invocations in this wrapper
    # because AgentCore handles session context differently.
    # Ideally, we would retrieve history based on session_id.
    result = agent.invoke({
        "messages": [{"role": "user", "content": user_message}]
    })

    return {
        "response": result["messages"][-1].content,
        "session_id": session_id
    }

if __name__ == "__main__":
    app.run()
