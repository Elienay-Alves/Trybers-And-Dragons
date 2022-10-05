import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter, { SimpleFighter } from './Fighter';
import Race, { Elf } from './Races';
import getRandomInt from './utils';

const RANDOM_NUMBER = getRandomInt(1, 10);

class Character implements Fighter {
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;
  private _name: string;

  constructor(name: string) {
    this._name = name;
    this._dexterity = RANDOM_NUMBER;
    this._race = new Elf(this._name, this._dexterity);
    this._archetype = new Mage(this._name);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._strength = RANDOM_NUMBER;
    this._defense = RANDOM_NUMBER;
    this._energy = {
      type_: this._archetype.energyType,
      amount: RANDOM_NUMBER,
    };
  }
  
  get race(): Race {
    return this._race;
  }

  get archetype(): Archetype {
    return this._archetype;
  }

  get lifePoints(): number {
    return this._lifePoints;
  }

  get strength(): number {
    return this._strength;
  }

  get defense(): number {
    return this._defense;
  }

  get dexterity(): number {
    return this._dexterity;
  }

  get energy(): Energy {
    return { 
      type_: this._energy.type_,
      amount: this._energy.amount,
    };
  }

  receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this._defense;
    if (damage <= 0) {
      return this._lifePoints;
    }
    if (this._lifePoints - damage < 0) {
      this._lifePoints = -1;
    } else {
      this._lifePoints -= damage;
    }

    return this._lifePoints;
  }

  attack(enemy: SimpleFighter): void {
    enemy.receiveDamage(this._strength);
  }

  levelUp(): void {
    this._maxLifePoints += RANDOM_NUMBER;
    this._strength += RANDOM_NUMBER;
    this._dexterity += RANDOM_NUMBER;
    this._defense += RANDOM_NUMBER;
    this._energy.amount = 10;
    if (this._maxLifePoints + RANDOM_NUMBER > this._race.maxLifePoints) {
      this._maxLifePoints = this._race.maxLifePoints;
    }
    this._lifePoints = this._maxLifePoints;
  }

  special(enemy: SimpleFighter): void {
    enemy.receiveDamage(this._strength * 2);
  }
}
export default Character;