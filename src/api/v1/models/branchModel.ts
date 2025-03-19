/**
 * @openapi
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the branch
 *         name:
 *           type: string
 *           description: Name of the branch
 *         address:
 *           type: string
 *           description: Address of the branch
 *         phone:
 *           type: string
 *           description: Contact phone number of the branch
 */
export type Branch = {
  id: string;
  name: string;
  address: string;
  phone: string;
};
