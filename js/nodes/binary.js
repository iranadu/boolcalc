
import {Node} from './base';

/**
 * Represents a node with two children
 */
export class BinaryNode extends Node {

	/**
	 * @constructor
	 * @param {Node} left
	 * @param {Node} right
	 */
	constructor(left, right) {
		super();
		this.left = left;
		this.right = right;
	}

	/**
	 * Returns a string representation of the node
	 * @returns {string}
	 */
	toString() {
		return 'Node(' + this.left + ', ' + this.right + ')'
	}

	static wrapNode(node) {
		let s = node.toString();

		// ensure that OR nodes have brackets to maintain precedence
		if (node instanceof OrNode || node instanceof XOrNode) {
			s = '(' + s + ')';
		}

		return s;
	}
}

/**
 * Represents an "and" node
 */
export class AndNode extends BinaryNode {

	/**
	 * Evaluate the node
	 * @returns {boolean} The result of (L ∧ R)
	 */
	eval() {
		return this.left.eval() && this.right.eval();
	}

	/**
	 * Returns a string representation of the node
	 * @returns {string}
	 */
	toString() {
		return BinaryNode.wrapNode(this.left) + ' ∧ ' + BinaryNode.wrapNode(this.right);
	}
}

/**
 * Represents an OR node
 */
export class OrNode extends BinaryNode {

	/**
	 * Evaluates the node
	 * @returns {boolean} The result of (L ∨ R)
	 */
	eval() {
		return this.left.eval() || this.right.eval();
	}

	/**
	 * Returns a string representation of the node
	 * @returns {string}
	 */
	toString() {
		return this.left + ' ∨ ' + this.right;
	}
}

/**
 * Represents an XOR node
 */
export class XOrNode extends BinaryNode {

	/**
	 * Evaluates the node
	 * @returns {boolean} The result of (L ⊻ R)
	 */
	eval() {
		return this.left.eval() ? ! this.right.eval() : this.right.eval();
	}

	/**
	 * Returns a string representation of the node
	 * @returns {string}
	 */
	toString() {
		return this.left + ' ⊻ ' + this.right;
	}
}

/**
 * Represents a equivalence node
 */
export class EquivNode extends BinaryNode {

	/**
	 * Evaluates the node
	 * @returns {boolean} The result of (L ≡ R)
	 */
	eval() {
		return this.left.eval() === this.right.eval();
	}

	/**
	 * Returns a string representation of the node
	 * @returns {string}
	 */
	toString() {
		return BinaryNode.wrapNode(this.left) + ' ≡ ' + BinaryNode.wrapNode(this.right);
	}
}

/**
 * Represents an implication node
 */
export class ImpliesNode extends BinaryNode {

	/**
	 * Evaluates the node
	 * @returns {boolean} The result of (L → R)
	 */
	eval() {
		return this.left.eval() ? this.right.eval() : true;
	}

	/**
	 * Returns a string representation of the node
	 * @returns {string}
	 */
	toString() {
		return BinaryNode.wrapNode(this.left) + ' → ' + BinaryNode.wrapNode(this.right);
	}
}
