import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
	email: {
		type: String,
		unique: [true, 'Cet email existe déjà'],
		required: [true, 'Un email est obligatoire !'],
	},
	username: {
		type: String,
		required: [true, 'Username is required!'],
		match: [
			/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
			"Nom d'utilisateur invalide, il doit contenir entre 8 et 20 lettres alphanumériques et être unique !",
		],
	},
	image: {
		type: String,
	},
});

const User = models.User || model('User', UserSchema);

export default User;
