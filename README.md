# Dera

> Yet another TypeDI extension for NodeCG

This TypeDI extension enable the usage of NodeCG ecosystem in services via decorators.

## Install

```bash
$ npm install dera
```

## Usage

```typescript
import { useContainer, InjectNodeCG, InjectReplicant } from "dera";
import { NodeCG, ReplicantServer } from "nodecg/types/server";
import { Container, Service } from "typedi";

@Service()
class HelloModule {
  @InjectNodeCG() nodecg!: NodeCG;
  @InjectReplicant({ defaultValue: "Spark" }) name!: ReplicantServer<string>;

  say(): void {
    console.log(`Hello ${this.name.value}!`); // Prints "Hello Spark!"
  }
}

export = (nodecg: NodeCG) => {
  useContainer(Container, nodecg);

  Container.get(HelloModule).say();
};
```

## API

See the [TypeScript definition file](./index.d.ts).

## Author

Alexandre Breteau - [@0xSeldszar](https://twitter.com/0xSeldszar)

## License

MIT © [Alexandre Breteau](https://seldszar.fr)
