// Dependencies
// =============================================================
//src/models/users.js
export default (sequelize, DataTypes) => 
  sequelize.define('Profile', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    handle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 40, // only allow values <= 40 characters
      },
    },
    company: {
      type: DataTypes.STRING
    },
    website: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    skills: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('value').split(';')
      },
      set(value) {
        this.setDataValue('value',value.join(';'));
      },
    },
    bio: {
      type: DataTypes.STRING
    },
    githubusername: {
      type: DataTypes.STRING
    },
    experiences: {
      type: DataTypes.STRING,
      _expList: {
        type: DataTypes.TEXT
      },    
      expList: {
        type: DataTypes.TEXT
      },
      get: {
        expList: () => {
          return JSON.parse(this._expList);
        }
      },
      set: {
        expList: value => {
          this._expList = JSON.stringify(value);
        }
      }
    },
    social: {
      type: DataTypes.STRING,
      _socList: {
        type: DataTypes.TEXT
      },    
      socList: {
        type: DataTypes.TEXT
      },
      get: {
        socList: () => {
          return JSON.parse(this._socList);
        }
      },
      set: {
        socList: value => {
          this._socList = JSON.stringify(value);
        }
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at:  DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    timestamps: false,
    tableName: 'profiles',
    underscored: true,
    freezeTableName: true,
    classMethods: {
      associate: function(db) {
        DataTypes.belongsTo(db.User, { foreignKey: 'user_id' });
      },
    },
  });
