from backend.app.db.database import Base, engine

import backend.app.models

Base.metadata.create_all(bind=engine)

print("Tables created successfully.")