<?php

declare(strict_types = 1);

namespace Drupal\graphql_composable\Wrappers\Response;

use Drupal\Core\Entity\EntityInterface;
use Drupal\graphql\GraphQL\Response\Response;

/**
 * Type of response used when products are returned.
 */
class ProductsResponse extends Response {

  /**
   * The products to be served.
   *
   * @var \Drupal\Core\Entity\EntityInterface|null
   */
  protected $products;

  /**
   * Sets the content.
   *
   * @param \Drupal\Core\Entity\EntityInterface|null $products
   *   The products to be served.
   */
  public function setProducts(?EntityInterface $products): void {
    $this->products = $products;
  }

  /**
   * Get the products to be served.
   *
   * @return \Drupal\Core\Entity\EntityInterface|null
   *   The products to be served.
   */
  public function products(): ?EntityInterface {
    return $this->products;
  }

}
