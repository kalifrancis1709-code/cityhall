import 'dotenv/config';
import * as bcrypt from 'bcrypt';

import AppDataSource from '../../data-source';
import { User } from '../../users/entities/user.entity';

async function seed() {
try {
    await AppDataSource.initialize();

    console.log('Connexion à la base de données établie.');

    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOne({
        where: { email: 'admin@example.com' },
        });

        if (!existingUser) {
            const hashedPassword = await bcrypt.hash('password', 10);

            const newUser = userRepository.create({
                email: 'admin@example.com',
                password: hashedPassword,
                firstName: 'Admin',
                lastName: 'User',
                role: 'admin',
            });

            await userRepository.save(newUser);

            console.log('Utilisateur admin créé avec succès.');
        } else {
            console.log("L'utilisateur admin existe déjà.");
        }

    } catch (error) {
        console.error(
            "Erreur lors de la création de l'utilisateur admin :",
            error,
        );

        process.exitCode = 1;

    } finally {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
            console.log('Connexion à la base de données fermée.');
        }
    }
}

seed();