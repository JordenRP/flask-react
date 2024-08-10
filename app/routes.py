from flask import request, jsonify
from app import app, db
from app.models import User

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    if not data or not 'email' in data or not 'password' in data:
        return jsonify({'error': 'Email and password are required'}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'User already exists'}), 400

    user = User(email=data['email'])
    user.set_password(data['password'])
    user.first_name = data['first_name']
    user.last_name = data['last_name']

    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    if not data or not 'email' in data or not 'password' in data:
        return jsonify({'error': 'Email and password are required'}), 400

    user = User.query.filter_by(email=data['email']).first()

    if user is None or not user.check_password(data['password']):
        return jsonify({'error': 'Invalid credentials'}), 401

    return jsonify({'message': 'Login successful'}), 200

@app.route('/get_user', methods=['GET'])
def get_user():
    email = request.args.get('email')
    if not email:
        return jsonify({'error': 'Email is required'}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({'error': 'User not found'}), 404

    user_data = {
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'phone_number': user.phone_number
    }

    return jsonify(user_data), 200

@app.route('/edit_profile', methods=['PUT'])
def edit_profile():
    data = request.json
    if not data or not 'email' in data:
        return jsonify({'error': 'Email is required'}), 400

    user = User.query.filter_by(email=data['email']).first()

    if not user:
        return jsonify({'error': 'User not found'}), 404

    if 'first_name' in data:
        user.first_name = data['first_name']
    if 'last_name' in data:
        user.last_name = data['last_name']
    if 'phone_number' in data:
        user.phone_number = data['phone_number']

    db.session.commit()

    return jsonify({'message': 'Profile updated successfully'}), 200
