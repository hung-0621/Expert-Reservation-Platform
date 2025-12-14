from flask import jsonify

def generate_response(code:int, message:str, data:object=None) -> dict:
    response = {
        "code": code,
        "message": message,
    }
    
    if data is not None:
        response["data"] = data
        
    return jsonify(response)