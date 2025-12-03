from langchain_aws import ChatBedrock
from langgraph.graph import StateGraph, START, END
from typing import TypedDict, Annotated
from langgraph.graph.message import add_messages
from agent.config import BEDROCK_MODEL_ID, AWS_REGION

class State(TypedDict):
    messages: Annotated[list, add_messages]

def create_agent(model_id: str = BEDROCK_MODEL_ID, region: str = AWS_REGION):
    llm = ChatBedrock(
        model_id=model_id,
        region_name=region,
        model_kwargs={"temperature": 0.7, "max_tokens": 4096}
    )

    def chatbot(state: State):
        return {"messages": [llm.invoke(state["messages"])]}

    graph = StateGraph(State)
    graph.add_node("chatbot", chatbot)
    graph.add_edge(START, "chatbot")
    graph.add_edge("chatbot", END)

    return graph.compile()
