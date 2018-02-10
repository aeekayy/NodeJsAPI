'use strict'; 

module.exports = {
	up: function (queryInterface, Sequelize) {
		var sequelize = queryInterface.sequelize, 
		    tableName = "Sessions";

		return sequelize
			.query('CREATE FUNCTION expire_old_sessions() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN DELETE FROM "' + tableName + '" WHERE expiration < NOW(); RETURN NEW; END; $$;')
			.then(function() {
				console.log("Session expiration created: Adding trigger")
				return sequelize
					.query('CREATE TRIGGER expire_old_sessions_trigger AFTER INSERT OR UPDATE ON "' + tableName + '" EXECUTE PROCEDURE expire_old_sessions();')
					.catch(console.log); 
			}).catch(console.log);
	},

	down: function (queryInterface, Sequelize) {
		var sequelize = queryInterface.sequelize,
		tableName = "Sessions";

		return sequelize
			.query('DROP TRIGGER expire_old_sessions_trigger ON "' + tableName + '"')
			.then(function() {
				console.log("removed trigger")
			}).then(function() {
				return sequelize
					.query('DROP FUNCTION expire_old_sessions()')
					.catch(console.log)
			}).then(function() {
				console.log("removed function")
			}).catch(console.log)
	}
};
