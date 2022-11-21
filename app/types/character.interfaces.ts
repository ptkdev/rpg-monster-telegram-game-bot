/**
 * Character Interfaces
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */

/**
 * Character Interface
 * =====================
 *
 *
 * @interface [CharacterInterface](https://github.com/ptkdev/rpg-dndev-telegram-game-bot/blob/main/app/webcomponent/types/character.interfaces.ts)
 *
 * @param { number } id - telegram id
 * @param { boolean } is_bot - is user a bot
 * @param { string } first_name - user name from telegram
 * @param { string } username - user username from telegram
 * @param { string } character_name - user character name
 * @param { string } language_code - user code language from OS
 * @param { string } role - character role
 * @param { number } attack - character attack power
 * @param { number } defense - character defense power
 * @param { number } health - character health
 * @param { number } mana - character mana
 * @param { number } experience - character experience
 * @param { number } group_id - group id
 * @param { number } message_thread_id - thread id if group is a topic
 * @param { string } step - step of creation character
 *
 */
export interface CharacterInterface {
	/**
	 * Character Interface
	 * =====================
	 *
	 * @interface [CharacterInterface](https://github.com/ptkdev/rpg-dndev-telegram-game-bot/blob/main/app/webcomponent/types/character.interfaces.ts)
	 *
	 * @param { string } id - telegram id
	 *
	 */
	id: number | string;
	/**
	 * Character Interface
	 * =====================
	 *
	 * @interface [CharacterInterface](https://github.com/ptkdev/rpg-dndev-telegram-game-bot/blob/main/app/webcomponent/types/character.interfaces.ts)
	 *
	 * @param { boolean } is_bot - is user a bot
	 *
	 */
	is_bot?: boolean;
	/**
	 * Character Interface
	 * =====================
	 *
	 * @interface [CharacterInterface](https://github.com/ptkdev/rpg-dndev-telegram-game-bot/blob/main/app/webcomponent/types/character.interfaces.ts)
	 *
	 * @param { string } first_name - user name from telegram
	 *
	 */
	first_name?: string;
	/**
	 * Character Interface
	 * =====================
	 *
	 * @interface [CharacterInterface](https://github.com/ptkdev/rpg-dndev-telegram-game-bot/blob/main/app/webcomponent/types/character.interfaces.ts)
	 *
	 * @param { string } username - user username from telegram
	 *
	 */
	username?: string;
	/**
	 * Character Interface
	 * =====================
	 *
	 * @interface [CharacterInterface](https://github.com/ptkdev/rpg-dndev-telegram-game-bot/blob/main/app/webcomponent/types/character.interfaces.ts)
	 *
	 * @param { string } character_name - user character name
	 *
	 */
	character_name: string;
	/**
	 * Character Interface
	 * =====================
	 *
	 * @interface [CharacterInterface](https://github.com/ptkdev/rpg-dndev-telegram-game-bot/blob/main/app/webcomponent/types/character.interfaces.ts)
	 *
	 * @param { string } language_code - user code language from OS
	 *
	 */
	language_code?: string;
	/**
	 * Character Interface
	 * =====================
	 *
	 * @interface [CharacterInterface](https://github.com/ptkdev/rpg-dndev-telegram-game-bot/blob/main/app/webcomponent/types/character.interfaces.ts)
	 *
	 * @param { string } role - character role
	 *
	 */
	role?: string;
	/**
	 * Character Interface
	 * =====================
	 *
	 * @interface [CharacterInterface](https://github.com/ptkdev/rpg-dndev-telegram-game-bot/blob/main/app/webcomponent/types/character.interfaces.ts)
	 *
	 * @param { number } attack - character attack power
	 *
	 */
	attack: number;
	/**
	 * Character Interface
	 * =====================
	 *
	 * @interface [CharacterInterface](https://github.com/ptkdev/rpg-dndev-telegram-game-bot/blob/main/app/webcomponent/types/character.interfaces.ts)
	 *
	 * @param { number } defence - character defence power
	 *
	 */
	defence: number;
	/**
	 * Character Interface
	 * =====================
	 *
	 * @interface [CharacterInterface](https://github.com/ptkdev/rpg-dndev-telegram-game-bot/blob/main/app/webcomponent/types/character.interfaces.ts)
	 *
	 * @param { number } health - character health
	 *
	 */
	health: number;
	/**
	 * Character Interface
	 * =====================
	 *
	 * @interface [CharacterInterface](https://github.com/ptkdev/rpg-dndev-telegram-game-bot/blob/main/app/webcomponent/types/character.interfaces.ts)
	 *
	 * @param { number } mana - character mana
	 *
	 */
	mana: number;
	/**
	 * Character Interface
	 * =====================
	 *
	 * @interface [CharacterInterface](https://github.com/ptkdev/rpg-dndev-telegram-game-bot/blob/main/app/webcomponent/types/character.interfaces.ts)
	 *
	 * @param { number } experience - character experience
	 *
	 */
	experience: number;
	/**
	 * Character Interface
	 * =====================
	 *
	 * @interface [CharacterInterface](https://github.com/ptkdev/rpg-dndev-telegram-game-bot/blob/main/app/webcomponent/types/character.interfaces.ts)
	 *
	 * @param { number } group_id - users group id
	 *
	 */
	group_id: number;
	/**
	 * Character Interface
	 * =====================
	 *
	 * @interface [CharacterInterface](https://github.com/ptkdev/rpg-dndev-telegram-game-bot/blob/main/app/webcomponent/types/character.interfaces.ts)
	 *
	 * @param { number } message_thread_id - thread id if group is a topic
	 *
	 */
	message_thread_id: number;
	/**
	 * Character Interface
	 * =====================
	 *
	 * @interface [CharacterInterface](https://github.com/ptkdev/rpg-dndev-telegram-game-bot/blob/main/app/webcomponent/types/character.interfaces.ts)
	 *
	 * @param { string } step - step of create character
	 *
	 */
	step: string;
}
