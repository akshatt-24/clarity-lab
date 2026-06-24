from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.api.routes.reports import (
    router as reports_router
)

app = FastAPI(title="ClarityLab API",
              version="0.1.0"  
            )

app.include_router(
    reports_router
)

@app.get("/")
def root():
    
    return {
        "message": "ClarityLab API Running"
    }
    
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)