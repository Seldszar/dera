const { Container, Token } = require("typedi");

const NodeCGToken = new Token("NodeCG");

function getNodeCG(container) {
	container.get(NodeCGToken);
}

function useContainer(container, nodecg) {
	container.set(NodeCGToken, nodecg);
}

function createDecorator(handler) {
	return (object, propertyName, index) => {
		Container.registerHandler({
			value: (container) =>
				handler(getNodeCG(container), { object, propertyName, index }),
			propertyName,
			object,
			index,
		});
	};
}

function InjectNodeCG() {
	return createDecorator((nodecg) => nodecg);
}

function InjectBundleConfig() {
	return createDecorator((nodecg) => nodecg.bundleConfig);
}

function InjectLogger(name) {
	return createDecorator((nodecg) => new nodecg.Logger(name));
}

function InjectReplicant(name, namespace, options) {
	if (typeof name === "object") {
		return InjectReplicant(undefined, undefined, name);
	}

	if (typeof namespace === "object") {
		return InjectReplicant(name, undefined, namespace);
	}

	return createDecorator((nodecg, { index, propertyName }) => {
		if (typeof name === "undefined") {
			if (typeof index === "number") {
				throw new TypeError("A name is required when decorating a parameter");
			}

			name = propertyName;
		}

		if (typeof namespace === "undefined") {
			namespace = nodecg.bundleName;
		}

		return nodecg.Replicant(name, namespace, options);
	});
}

module.exports = {
	getNodeCG,
	useContainer,
	createDecorator,
	InjectNodeCG,
	InjectBundleConfig,
	InjectLogger,
	InjectReplicant,
};
