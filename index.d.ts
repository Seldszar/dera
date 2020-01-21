/* eslint-disable @typescript-eslint/ban-types */

import {NodeCG, ReplicantOptions} from 'nodecg/types/server';
import {Container} from 'typedi';

/**
 * A decorator descriptor.
 */
export interface DecoratorDescriptor {
	object: object;
	propertyName: string;
	index?: number;
}

/**
 * A decorator handler.
 */
export type DecoratorHandler<T> = (nodecg: NodeCG, descriptor: DecoratorDescriptor) => T;

/**
 * Returns the NodeCG instance registered the service cotainer.
 * @param container the service container
 */
export function getNodeCG(container: Container): NodeCG;

/**
 * Registers the NodeCG instance to the service container.
 * @param container the service container
 * @param nodecg the NodeCG instance
 */
export function useContainer(container: Container, nodecg: NodeCG): void;

/**
 * Creates a new decorator.
 * @param handler the function called when the decorator is being applied
 */
export function createDecorator<T>(handler: DecoratorHandler<T>): Function;

/**
 * Injects the NodeCG instance.
 */
export function InjectNodeCG(): Function;

/**
 * Injects the bundle configuration.
 */
export function InjectBundleConfig(): Function;

/**
 * Injects a logger.
 * @param name the logger name
 */
export function InjectLogger(name: string): Function;

/**
 * Injects a Replicant.
 * @param options the Replicant options
 */
export function InjectReplicant<T>(options?: ReplicantOptions<T>): Function;

/**
 * Injects a Replicant.
 * @param name the Replicant name
 * @param options the Replicant options
 */
export function InjectReplicant<T>(name: string, options?: ReplicantOptions<T>): Function;

/**
 * Injects a Replicant.
 * @param name the Replicant name
 * @param namespace the Replicant namespace
 * @param options the Replicant options
 */
export function InjectReplicant<T>(name: string, namespace: string, options?: ReplicantOptions<T>): Function;
