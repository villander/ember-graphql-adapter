import Parser from 'graphql-adapter/parser';
import Generator from 'graphql-adapter/generator';
import ArgumentSet from 'graphql-adapter/types/argument-set';
import { Field, Operation } from 'graphql-adapter/types';

export default function Compiler() {}

Compiler.compile = function(model, store, options) {
  options = options || {};
  let operationType = options['operationType']; // TODO: Must be query or mutation
  let operationName = options['operationName'];
  let operation = new Operation(operationType, operationName);

  let rootFieldQuery = options['rootFieldQuery'] || {};
  let rootFieldName = options['rootFieldName'] || model.modelName;
  let rootFieldAlias = options['rootFieldAlias'];
  let rootField = new Field(rootFieldName, rootFieldAlias, ArgumentSet.fromQuery(rootFieldQuery));

  let parseTree = Parser.parse(model, store, operation, rootField);

  return Generator.generate(parseTree);
};
