import {
    Association,
    ENUM,
    HasManyAddAssociationMixin,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManyHasAssociationsMixin,
    Model,
    Optional,
    SMALLINT,
    STRING,
    VIRTUAL,
} from "sequelize";
import { sequelize } from "../connection";
import { Script } from "./Script";

interface UserAttributes {
    userId?: number;
    fullName?: string;
    email?: string;
    password?: string;
    role?: string;
    mcuId?: number;
    info?: object;
}

interface UserCreationAttributes extends Optional<UserAttributes, "userId"> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    // Attributes
    /**
     * @Params
     */
    public userId!: number;
    public fullName!: string;
    public email!: string;
    public password!: string;
    public role!: string;
    public mcuId!: number;

    public readonly info!: object;

    // Timestamps
    public readonly createAt!: Date;
    public readonly updateAt!: Date;

    // Associate model
    public readonly scripts?: Script[];
    public getScripts!: HasManyGetAssociationsMixin<Script>;
    public hasScript!: HasManyHasAssociationsMixin<Script, number>;
    public addScript!: HasManyAddAssociationMixin<Script, number>;
    public countScripts!: HasManyCountAssociationsMixin;
    public createScript!: HasManyCreateAssociationMixin<Script>;

    public static associations: {
        scripts: Association<User, Script>;
    };
}

User.init(
    {
        // Model attributes are defined here
        userId: { type: SMALLINT, primaryKey: true, autoIncrement: true },

        fullName: { type: STRING, allowNull: false },

        email: { type: STRING, unique: true, allowNull: false, validate: { is: /\S+@\S+\.\S+/i } },

        password: { type: STRING(60), allowNull: false, validate: { is: /^[\S]{60}$/i } },

        role: { type: ENUM({ values: ["customer", "admin"] }), allowNull: false, defaultValue: "customer" },

        mcuId: { type: SMALLINT, allowNull: false },

        info: {
            type: VIRTUAL,
            get() {
                return { userId: this.userId, fullName: this.fullName, email: this.email, role: this.role, mcuId: this.mcuId };
            },
        },
    },
    { sequelize },
);
