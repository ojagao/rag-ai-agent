# __init__.pyを配置したフォルダ内の処理やライブラリをimport
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent.core import create_agent
from agent.config import BEDROCK_MODEL_ID, AWS_REGION
import os
import re
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

agent = create_agent(
    model_id=BEDROCK_MODEL_ID,
    region=AWS_REGION
)

class ChatRequest(BaseModel):
    message: str
    history: list[dict] = []

class ChatResponse(BaseModel):
    response: str

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        messages = request.history + [{"role": "user", "content": request.message}]
        result = agent.invoke({"messages": messages})
        
        content = result["messages"][-1].content
        clean_content = re.sub(r'<reasoning>.*?</reasoning>', '', content, flags=re.DOTALL).strip()
        
        if not clean_content:
            clean_content = content
        
        return ChatResponse(response=clean_content)
    except Exception as e:
        print(f"[ERROR] {type(e).__name__}: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8005)
