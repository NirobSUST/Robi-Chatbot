from flask import Flask, request, jsonify
import langchain_business
import config
app = Flask(__name__)
conversational_agent = None

# engine_path = "C:/Users/BS505/Documents/GitHub/gpt-bot/bot_service/langchain/engine"

def generate_text(prompt, conversational_agent):
    # input_ids = prompt
    output = langchain_business.run(prompt, conversational_agent)
    text = output
    return text

@app.route("/generate", methods=["POST"])
def generate_endpoint():
    prompt = request.json.get("prompt", "")
    generated_text = generate_text(prompt, conversational_agent)
    # slot, slot_value= langchain_business.slot_match(prompt,engine_path)
    x= jsonify({"generated_text": generated_text}) # ,"slot name": slot, "slot_value":slot_value})
    return jsonify({"generated_text": generated_text}) #,"slot name": slot, "slot_value":slot_value})

if __name__ == "__main__":
    conversational_agent = langchain_business.initiation()
    # snip_engine= langchain_business.snip_init(engine_path)
    app.run(debug=True, host=config.host, port=config.port)
