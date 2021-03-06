const Logger = require('./logger.js');
const Token = require('./token.js');
const SymbolTable = require('./symbol_table.js');

module.exports = {
  analyze: function(ast) {
    var globalSymbolTable = new SymbolTable(null);
    ast.analyze(globalSymbolTable);
  },

  analyzeVariableExpressionNode: function(symbolTable) {
    if (!symbolTable.lookup(this.name)) {
      Logger.LogError('error: variable not defined');
    }
  },

  analyzeBinaryExpressionNode: function(symbolTable) {
    this.left.analyze(symbolTable);
    this.right.analyze(symbolTable);
  },

  analyzeAssignmentStatementNode: function(symbolTable) {
    if (!symbolTable.lookup(this.variable.name)) {
      symbolTable.addSymbol(this.variable.name, 'variable');
    }
  },

  analyzeCallExpressionNode: function(symbolTable) {
    if (!symbolTable.lookup(this.callee_name)) {
      Logger.LogError("error: function name undefined");
      return null;
    } else {
      this.callee = symbolTable.functionLookup(this.callee_name);
    }
  },

  analyzeExpressionSequenceNode: function(symbolTable) {
    for (var i = 0; i < this.expressions.length; i++) {
      this.expressions[i].analyze(symbolTable);
    }
  },

  analyzeSelfInvokingFunctionNode: function(parentSymbolTable) {
    this.symbolTable = new SymbolTable(parentSymbolTable);
    for (var i = 0; i < this.signatureArgs.length; i++) {
      this.symbolTable.addSymbol(this.signatureArgs[i].name, 'argument');
    }
    this.body.analyze(this.symbolTable);
  },

  analyzeFunctionNode: function(parentSymbolTable) {
    this.symbolTable = new SymbolTable(parentSymbolTable);
    parentSymbolTable.addSymbol(this.signature.name, this);
    for (var i = 0; i < this.signature.args.length; i++) {
      this.symbolTable.addSymbol(this.signature.args[i].name, 'argument');
    }
    this.body.analyze(this.symbolTable);
  },

  analyzeForLoopNode: function(parentSymbolTable) {
    this.listNode.analyze(parentSymbolTable);
    this.expressionSequence.analyze(parentSymbolTable);
  },

  analyzeClosureNode: function(parentSymbolTable) {
    this.symbolTable = new SymbolTable(parentSymbolTable);
    for (var i = 0; i < this.args.length; i++) {
      this.symbolTable.addSymbol(this.args[i].name, 'argument');
    }
    this.body.analyze(this.symbolTable);
  },

  analyzeListGeneratorNode: function(parentSymbolTable) {
    this.left.analyze(parentSymbolTable);
    this.right.analyze(parentSymbolTable);
    this.increment.analyze(parentSymbolTable);
    this.conditionalClosure.analyze(parentSymbolTable);
  },

  analyzeStatementNode: function(parentSymbolTable) {
    this.expression.analyze(parentSymbolTable);
  }
}
