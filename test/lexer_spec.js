var assert = require('chai').assert;
const Lexer = require('../src/lexer.js');
const Token = require('../src/token.js');

describe('Lexer', function() {
  describe('tokenize', function() {
    var tokens = Lexer.tokenize("identifier = 12345 + 23456 - ((234 * 2) / 4)");

    it('should generate the correct amount of tokens', function() {
      assert.lengthOf(tokens, 16);
    });

    it ('should end with an EOF token', function() {
      assert.equal(tokens[15].lexeme, "EOF");
      assert.equal(tokens[15].code, Token.EOF);
    })

    describe('identifiers', function() {
      it('should generate the correct lexeme for an identifier', function() {
        assert.equal(tokens[0].lexeme, "identifier");
      });

      it('should generate the correct token code for an identifier', function() {
        assert.equal(tokens[0].code, Token.ID);
      });
    });

    describe('numbers', function() {
      it('should generate the correct lexeme for a number', function() {
        assert.equal(tokens[2].lexeme, "12345");
      });

      it('should generate the correct token code for a number', function() {
        assert.equal(tokens[2].code, Token.NUM);
      });
    });

    describe('assignment', function() {
      it('should generate the correct lexeme for an assignment operator', function() {
        assert.equal(tokens[1].lexeme, "=");
      });

      it('should generate the correct token code for an assignment operator', function() {
        assert.equal(tokens[1].code, Token.ASSIGN_OP);
      });
    });

    describe('comparison', function() {
      var tokens = Lexer.tokenize("id == 4");
      it('should generate the correct lexeme for a comparison operator', function() {
        assert.equal(tokens[1].lexeme, "==");
      });

      it('should generate the correct token code for a comparison operator', function() {
        assert.equal(tokens[1].code, Token.COMPARISON_OP);
      });
    });

    describe('addition', function() {
      it('should generate the correct lexeme for an addition operator', function() {
        assert.equal(tokens[3].lexeme, "+");
      });

      it('should generate the correct token code for an assignment operator', function() {
        assert.equal(tokens[3].code, Token.ADD_OP);
      });
    });

    describe('subtract', function() {
      var tokens = Lexer.tokenize("2-1");
      console.log(tokens);
      it('should generate the correct lexeme for a subtraction operator', function() {
        assert.equal(tokens[1].lexeme, "-");
      });

      it('should generate the correct token code for a subtration operator', function() {
        assert.equal(tokens[1].code, Token.SUB_OP);
      });
    });

    describe('multiply', function() {
      it('should generate the correct lexeme for a multiply operator', function() {
        assert.equal(tokens[9].lexeme, "*");
      });

      it('should generate the correct token code for a multiply operator', function() {
        assert.equal(tokens[9].code, Token.MULT_OP);
      });
    });

    describe('divide', function() {
      it('should generate the correct lexeme for a divide operator', function() {
        assert.equal(tokens[12].lexeme, "/");
      });

      it('should generate the correct token code for a divide operator', function() {
        assert.equal(tokens[12].code, Token.DIV_OP);
      });
    });

    describe('mod', function() {
      var tokens = Lexer.tokenize("%");
      it('should generate the correct lexeme for a mod operator', function() {
        assert.equal(tokens[0].lexeme, "%");
      });

      it('should generate teh correct token code for a mod operator', function() {
        assert.equal(tokens[0].code, Token.MOD_OP);
      });
    });

    describe('left paren', function() {
      it('should generate the correct lexeme for a left paren', function() {
        assert.equal(tokens[7].lexeme, "(");
      });

      it('should generate the correct token code for a left paren', function() {
        assert.equal(tokens[7].code, Token.LEFT_PAREN);
      });
    });

    describe('right paren', function() {
      it('should generate the correct lexeme for a right paren', function() {
        assert.equal(tokens[14].lexeme, ")");
      });

      it('should generate the correct token code for a right paren', function() {
        assert.equal(tokens[14].code, Token.RIGHT_PAREN);
      });
    });

    describe('left bracket', function() {
      var tokens = Lexer.tokenize("myArray = [1,2]");
      it('should generate the correct lexeme for a left bracket', function() {
        assert.equal(tokens[2].lexeme, "[");
      });

      it('should generate the correct token code for a left bracket', function() {
        assert.equal(tokens[2].code, Token.LEFT_BRACKET);
      });
    });

    describe('right bracket', function() {
      var tokens = Lexer.tokenize("myArray = [1,2]");
      it('should generate the correct lexeme for a right bracket', function() {
        assert.equal(tokens[6].lexeme, "]");
      });

      it('should generate the correct token code for a right bracket', function() {
        assert.equal(tokens[6].code, Token.RIGHT_BRACKET);
      });
    });

    describe('comma', function() {
      var tokens = Lexer.tokenize("myArray = [1,2]");
      it('should generate the correct lexeme for a comma', function() {
        assert.equal(tokens[4].lexeme, ",");
      });

      it('should generate the correct token code for a comma', function() {
        assert.equal(tokens[4].code, Token.COMMA);
      });
    });

    describe('newline', function() {
      var tokens = Lexer.tokenize("function add(a,b)\na+b\nend");
      it('should generate the correct lexeme for a newline', function() {
        assert.equal(tokens[7].lexeme, '\n');
      });

      it('should generate the correct token code for a newline', function() {
        assert.equal(tokens[7].code, Token.NEWLINE);
      });
    });

    describe('function', function() {
      var tokens = Lexer.tokenize("function add(a,b)\na+b\nend");
      it('should generate the correct lexeme for the function keyword', function() {
        assert.equal(tokens[0].lexeme, 'function');
      });

      it('should generate the correct token code for the function keyword', function() {
        assert.equal(tokens[0].code, Token.FUNCTION_KEYWORD);
      });
    });

    describe('end', function() {
      var tokens = Lexer.tokenize("function add(a,b)\na+b\nend");
      it('should generate the correct lexeme for the end keyword', function() {
        assert.equal(tokens[12].lexeme, 'end');
      });

      it('should generate the correct token code for the end keyword', function() {
        assert.equal(tokens[12].code, Token.END_KEYWORD);
      });
    });

    describe('for', function() {
      var tokens = Lexer.tokenize("for num in myNums");
      it('should generate the correct lexeme for the for keyword', function() {
        assert.equal(tokens[0].lexeme, 'for');
      });

      it('should generate the correct token code for the for keyword', function() {
        assert.equal(tokens[0].code, Token.FOR_KEYWORD);
      });
    });

    describe('in', function() {
      var tokens = Lexer.tokenize("for num in myNums");
      it('should generate the correct lexeme for the in keyword', function() {
        assert.equal(tokens[2].lexeme, 'in');
      });

      it('should generate the correct token code for the in keyword', function() {
        assert.equal(tokens[2].code, Token.IN_KEYWORD);
      });
    });

    describe('do', function() {
      var tokens = Lexer.tokenize("for num in myNums do end");
      it('should generate the correct lexeme for the do keyword', function() {
        assert.equal(tokens[4].lexeme, 'do');
      })

      it('should generate the correct token code for the do keyword', function() {
        assert.equal(tokens[4].code, Token.DO_KEYWORD);
      });
    });

    describe('print', function() {
      var tokens = Lexer.tokenize("print");
      it('should generate the correct lexeme for the print keyword', function() {
        assert.equal(tokens[0].lexeme, 'print');
      });

      it('should generate the correct token code for the print keyword', function() {
        assert.equal(tokens[0].code, Token.PRINT_KEYWORD);
      });
    });

    describe('where', function() {
      var tokens = Lexer.tokenize("i in (3..5 where do |i| i % 2 == 0 end) do i*2 end");
      it('should generate the correct lexeme for the print keyword', function() {
        assert.equal(tokens[6].lexeme, 'where');
      });

      it('should generate the correct token code for the print keyword', function() {
        assert.equal(tokens[6].code, Token.WHERE_KEYWORD);
      });
    });

    describe('by', function() {
      var tokens = Lexer.tokenize("for i in 1..10 by 2");
      it('should generate the correct lexeme for the by keyword', function() {
        assert.equal(tokens[6].lexeme, 'by');
      });

      it('should generate the correct token code for the by keyword', function() {
        assert.equal(tokens[6].code, Token.BY_KEYWORD);
      });
    });

    describe('return', function() {
      var tokens = Lexer.tokenize("function add(a,b) return a + b end");
      it('should generate the correct lexeme for the return keyword', function() {
        assert.equal(tokens[7].lexeme, 'return');
      });

      it('should generate the correct token coe for the return keyword', function() {
        assert.equal(tokens[7].code, Token.RETURN_KEYWORD);
      });
    });

    describe('or', function() {
      var tokens = Lexer.tokenize("a or b");
      it('should generate the correct lexeme for the or keyword', function() {
        assert.equal(tokens[1].lexeme, 'or');
      });

      it('should generate the correct token coe for the or keyword', function() {
        assert.equal(tokens[1].code, Token.OR_KEYWORD);
      });
    });

    describe('point', function() {
      var tokens = Lexer.tokenize("myArray.push");
      it('should generate the correct lexeme for the point', function() {
        assert.equal(tokens[1].lexeme, '.');
      });

      it('should generate the correct token code for the point', function() {
        assert.equal(tokens[1].code, Token.POINT);
      });
    });

    describe('through', function() {
      var tokens = Lexer.tokenize("(1..5)");
      it('should generate the correct lexeme for the through op', function() {
        assert.equal(tokens[2].lexeme, '..');
      });

      it('should generate the correct token code for the through op', function() {
        assert.equal(tokens[2].code, Token.THROUGH_OP);
      });
    });

    describe('bar', function() {
      var tokens = Lexer.tokenize("|");
      it('should generate the correct lexeme for the bar op', function() {
        assert.equal(tokens[0].lexeme, '|');
      });

      it('should generate the correct token code for the bar op', function() {
        assert.equal(tokens[0].code, Token.BAR);
      });
    });

    describe('arrow', function() {
      var tokens = Lexer.tokenize("(x,y) -> x+y");
      it('should generate the correct lexeme for the arrow', function() {
        assert.equal(tokens[5].lexeme, '->');
      });

      it('should generate the correct token code for the arrow', function() {
        assert.equal(tokens[5].code, Token.ARROW_OP);
      });
    });
  });

  describe('isValidIdentifierChar', function() {
    it('should return true if the char is a letter', function() {
      assert.equal(Lexer.isValidIdentifierChar("a"), true);
    });

    it('should return true if the char is a capital letter', function() {
      assert.equal(Lexer.isValidIdentifierChar("F"), true);
    });

    it('should return false if the char is not a letter', function() {
      assert.equal(Lexer.isValidIdentifierChar("1"), false);
    });

    it('should return true if the char is an underscore', function() {
      assert.equal(Lexer.isValidIdentifierChar('_'), true);
    });

    it('should return false if the char is undefined', function() {
      assert.equal(Lexer.isValidIdentifierChar(undefined), false);
    });

    it('should return false if the char is a bracket', function() {
      assert.equal(Lexer.isValidIdentifierChar(']'), false);
    });
  });

  describe('isNum', function() {
    it('should return true if the char is a number', function() {
      assert.equal(Lexer.isNum("1"), true);
    });

    it('should return false if the char is not a number', function() {
      assert.equal(Lexer.isNum("a"), false);
    });

    it('should return false if the char is undefined', function() {
      assert.equal(Lexer.isNum(undefined), false);
    });
  });

  describe('isNumOrDecimalPoint', function() {
    it('should return true if the char is a decimal point', function() {
      assert.equal(Lexer.isNumOrDecimalPoint('.'), true);
    });
  })

  describe('isEqualsSign', function() {
    it('should return true if the char is an equals sign', function() {
      assert.equal(Lexer.isEqualsSign("="), true);
    });

    it('should return false if the char is not an equals sign', function() {
      assert.equal(Lexer.isEqualsSign("?"), false);
    });
  });

  describe('isWhitespace', function() {
    it('should return true if the char is whitespace', function() {
      assert.equal(Lexer.isWhitespace(" "), true);
    });

    it('should return false if the char is not whitespace', function() {
      assert.equal(Lexer.isWhitespace("a"), false);
    });
  });

  describe('isReservedWord', function() {
    it('should return true if the string is a reserved word', function() {
      assert.equal(Lexer.isReservedWord("function"), true);
    });

    it('should return false if the string is not a reserved word', function() {
      assert.equal(Lexer.isReservedWord("blargh"), false);
    });
  });
});
