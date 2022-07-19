<?php

namespace Drupal\graphql_composable\GraphQL\Response;

use Drupal\Core\Entity\EntityInterface;
use Drupal\graphql\GraphQL\Response\Response;

/**
 * Type of response used when products returned.
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
